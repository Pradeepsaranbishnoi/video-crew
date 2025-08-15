import React, { useState, useEffect, useRef } from "react";
import { Upload, ImageIcon, Video, Trash2, Search, Filter, Download, Eye } from "lucide-react";
import Seo from "../../components/common/Seo";
import { apiService } from "../../services/api";

// Custom CSS for toast animations
const toastStyles = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .animate-slideInRight {
    animation: slideInRight 0.5s ease-out forwards;
  }
  
  .animate-slideOutRight {
    animation: slideOutRight 0.5s ease-in forwards;
  }
`;

interface MediaFile {
  id: string;
  name: string;
  type: "image" | "video";
  url: string;
  size: number;
  uploadedAt: string;
  dimensions?: {
    width: number;
    height: number;
  };
}

export default function MediaAdmin() {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [previewModal, setPreviewModal] = useState<{
    isOpen: boolean;
    file: MediaFile | null;
  }>({
    isOpen: false,
    file: null
  });
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: 'success' | 'error';
  }>({
    show: false,
    message: '',
    type: 'success'
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load media files from API
  useEffect(() => {
    const loadMedia = async () => {
      try {
        setIsLoading(true);
        const apiFiles = await apiService.getMediaFiles();
        
        // Transform API data to match our interface
        const transformedFiles: MediaFile[] = apiFiles.map((file: any) => {
          console.log('Media file from API:', file); // Debug log
          return {
            id: file._id,
            name: file.originalName,
            type: file.type,
            url: file.url,
            size: file.size,
            uploadedAt: file.createdAt,
            dimensions: file.dimensions || { width: 1920, height: 1080 },
          };
        });

        setMediaFiles(transformedFiles);
      } catch (error) {
        console.error('Failed to load media files:', error);
        setMediaFiles([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadMedia();
  }, []);

  // Filter media files
  const filteredFiles = mediaFiles.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === "all" || file.type === filterType;
    return matchesSearch && matchesType;
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;
    setIsUploading(true);

    try {
      const newFiles: MediaFile[] = [];
      
      for (const file of Array.from(files)) {
        try {
          let uploadResult;
          
          if (file.type.startsWith("image/")) {
            uploadResult = await apiService.uploadImage(file);
          } else if (file.type.startsWith("video/")) {
            uploadResult = await apiService.uploadVideo(file);
          } else {
            console.warn(`Unsupported file type: ${file.type}`);
            continue;
          }

          const newFile: MediaFile = {
            id: Date.now() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type.startsWith("image/") ? "image" : "video",
            url: uploadResult.url,
            size: file.size,
            uploadedAt: new Date().toISOString(),
            dimensions: { width: 1920, height: 1080 }, // Default dimensions
          };
          
          newFiles.push(newFile);
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error);
          alert(`Failed to upload ${file.name}. Please try again.`);
        }
      }

      if (newFiles.length > 0) {
        // Reload media files from API to get the updated list
        const apiFiles = await apiService.getMediaFiles();
        const transformedFiles: MediaFile[] = apiFiles.map((file: any) => ({
          id: file._id,
          name: file.originalName,
          type: file.type,
          url: file.url,
          size: file.size,
          uploadedAt: file.createdAt,
          dimensions: file.dimensions || { width: 1920, height: 1080 },
        }));
        setMediaFiles(transformedFiles);
      }

      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("정말로 이 파일을 삭제하시겠습니까?")) {
      try {
        await apiService.deleteMediaFile(id);
        const updatedFiles = mediaFiles.filter((file) => file.id !== id);
        setMediaFiles(updatedFiles);
      } catch (error) {
        console.error("Delete failed:", error);
        alert("파일 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleSelectFile = (id: string) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = async () => {
    if (selectedFiles.length === 0) return;
    if (confirm(`${selectedFiles.length}개의 파일을 삭제하시겠습니까?`)) {
      try {
        // Delete each file from API
        for (const id of selectedFiles) {
          await apiService.deleteMediaFile(id);
        }
        
        const updatedFiles = mediaFiles.filter((file) => !selectedFiles.includes(file.id));
        setMediaFiles(updatedFiles);
        setSelectedFiles([]);
      } catch (error) {
        console.error("Bulk delete failed:", error);
        alert("파일 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast({
        show: true,
        message: '✅ URL이 클립보드에 복사되었습니다!',
        type: 'success'
      });
      // Auto hide toast after 3 seconds
      setTimeout(() => {
        setToast({ show: false, message: '', type: 'success' });
      }, 3000);
    } catch (err) {
      console.error('Failed to copy: ', err);
      setToast({
        show: true,
        message: '❌ URL 복사에 실패했습니다.',
        type: 'error'
      });
      // Auto hide toast after 3 seconds
      setTimeout(() => {
        setToast({ show: false, message: '', type: 'error' });
      }, 3000);
    }
  };

  const closeToast = () => {
    setToast({ show: false, message: '', type: 'success' });
  };

  // Debug: Log when modal opens
  useEffect(() => {
    if (previewModal.isOpen && previewModal.file) {
      console.log('Modal opened with URL:', previewModal.file.url);
    }
  }, [previewModal.isOpen, previewModal.file]);

  const totalSize = mediaFiles.reduce((sum, file) => sum + file.size, 0);
  const usedSpace = (totalSize / (1024 * 1024)).toFixed(2); // MB

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <style>{toastStyles}</style>
      <Seo title="Admin Media" description="비디오크루 관리자 – 이미지/비디오 업로드 및 파일 관리" />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-korean">미디어 관리</h2>
          <p className="text-gray-400 font-korean">이미지와 비디오 파일을 관리할 수 있습니다.</p>
        </div>
        <div className="flex items-center space-x-2">
          {selectedFiles.length > 0 && (
            <button
              onClick={handleBulkDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span className="font-korean">{selectedFiles.length}개 삭제</span>
            </button>
          )}
          <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors cursor-pointer">
            <Upload className="w-4 h-4" />
            <span className="font-korean">{isUploading ? "업로드 중..." : "파일 업로드"}</span>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileUpload}
              className="hidden"
              multiple
              accept="image/*,video/*"
            />
          </label>
        </div>
      </div>

      {/* Upload Progress */}
      {isUploading && (
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="flex items-center space-x-3">
            <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-white font-korean">파일 업로드 중...</span>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="파일명으로 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none appearance-none"
            >
              <option value="all">모든 타입</option>
              <option value="image">이미지</option>
              <option value="video">비디오</option>
            </select>
          </div>

          <div className="flex items-center text-gray-400">총 {filteredFiles.length}개 파일</div>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredFiles.map((file) => {
          const isSelected = selectedFiles.includes(file.id);

          return (
            <div
              key={file.id}
              className={`bg-gray-900 rounded-xl border transition-colors cursor-pointer ${
                isSelected ? "border-blue-500 bg-blue-500/10" : "border-gray-800 hover:border-gray-700"
              }`}
              onClick={() => handleSelectFile(file.id)}
            >
              <div className="relative h-48">
                {file.type === "image" ? (
                  <>
                    {console.log('Rendering image with URL:', file.url)} {/* Debug log */}
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-full object-cover rounded-t-xl bg-gray-800 cursor-pointer"
                      onError={(e) => {
                        console.error('Image failed to load:', file.url);
                        console.error('Error event:', e);
                        console.error('Error target:', e.target);
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', file.url);
                      }}
                      crossOrigin="anonymous"
                    />
                  </>
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-t-xl relative overflow-hidden">
                    <video
                      src={file.url}
                      className="w-full h-full object-cover"
                      muted
                      preload="metadata"
                      onError={(e) => {
                        console.error('Video failed to load:', file.url);
                        console.error('Error event:', e);
                        console.error('Error target:', e.target);
                      }}
                      onLoadedMetadata={() => {
                        console.log('Video metadata loaded successfully:', file.url);
                      }}
                      crossOrigin="anonymous"
                    />
                    {/* Video overlay with play icon */}
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <Video className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                )}

                {isSelected && (
                  <div className="absolute top-2 left-2">
                    <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">✓</span>
                    </div>
                  </div>
                )}

                <div className="absolute inset-0 bg-black/0 hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewModal({
                          isOpen: true,
                          file: file
                        });
                      }}
                      className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors cursor-pointer"
                      title="Preview Image"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const link = document.createElement("a");
                        link.href = file.url;
                        link.download = file.name;
                        link.click();
                      }}
                      className="p-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors cursor-pointer"
                      title="Download File"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file.id);
                      }}
                      className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors cursor-pointer"
                      title="Delete File"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-white font-medium text-sm truncate flex-1 mr-2">{file.name}</h3>
                  {file.type === "image" ? (
                    <ImageIcon className="w-4 h-4 text-green-400 flex-shrink-0" />
                  ) : (
                    <Video className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  )}
                </div>

                <div className="space-y-1 text-xs text-gray-400">
                  <div className="flex justify-between">
                    <span>크기</span>
                    <span>{formatFileSize(file.size)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>업로드</span>
                    <span>{formatDate(file.uploadedAt)}</span>
                  </div>
                  {file.dimensions && (
                    <div className="flex justify-between">
                      <span>해상도</span>
                      <span>
                        {file.dimensions.width}×{file.dimensions.height}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredFiles.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400">
            {searchTerm || filterType !== "all" ? "검색 결과가 없습니다." : "미디어 파일이 없습니다."}
          </div>
          {searchTerm || filterType !== "all" ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterType("all");
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              필터 초기화
            </button>
          ) : (
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer">
              <Upload className="w-4 h-4 inline mr-2" />
              첫 번째 파일 업로드
              <input
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                multiple
                accept="image/*,video/*"
              />
            </label>
          )}
        </div>
      )}

      {/* Storage Info */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-lg font-semibold text-white mb-4">저장 공간</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">사용된 공간</span>
            <span className="text-white">{usedSpace} MB / 512 MB</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(parseFloat(usedSpace) / 512) * 100}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">이미지</span>
              <span className="text-white">{mediaFiles.filter((f) => f.type === "image").length}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">비디오</span>
              <span className="text-white">{mediaFiles.filter((f) => f.type === "video").length}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">총 파일</span>
              <span className="text-white">{mediaFiles.length}개</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">사용률</span>
              <span className="text-white">{((parseFloat(usedSpace) / 512) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewModal.isOpen && previewModal.file && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-800">
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-semibold text-white font-korean">
                  {previewModal.file.name}
                </h3>
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  previewModal.file.type === 'image' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-blue-600 text-white'
                }`}>
                  {previewModal.file.type === 'image' ? '이미지' : '비디오'}
                </span>
              </div>
              <button
                onClick={() => setPreviewModal({ isOpen: false, file: null })}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 flex-1 overflow-y-auto">
              {/* Media Preview */}
              <div className="flex justify-center mb-6">
                {previewModal.file.type === 'image' ? (
                  <img
                    src={previewModal.file.url}
                    alt={previewModal.file.name}
                    className="max-w-full max-h-96 object-contain rounded-lg bg-gray-800"
                    onError={(e) => {
                      console.error('Preview image failed to load:', previewModal.file?.url);
                      console.error('Error event:', e);
                      console.error('Error target:', e.target);
                    }}
                    onLoad={() => {
                      console.log('Preview image loaded successfully:', previewModal.file?.url);
                    }}
                    crossOrigin="anonymous"
                  />
                ) : (
                  <video
                    src={previewModal.file.url}
                    controls
                    className="max-w-full max-h-96 rounded-lg bg-gray-800"
                    onError={(e) => {
                      console.error('Preview video failed to load:', previewModal.file?.url);
                      console.error('Error event:', e);
                      console.error('Error target:', e.target);
                    }}
                    onLoadStart={() => {
                      console.log('Preview video loading started:', previewModal.file?.url);
                    }}
                    onCanPlay={() => {
                      console.log('Preview video can play:', previewModal.file?.url);
                    }}
                    crossOrigin="anonymous"
                  >
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>

              {/* File Details */}
              <div className="bg-gray-800 rounded-lg p-4 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">파일명:</span>
                    <span className="text-white ml-2">{previewModal.file.name}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">크기:</span>
                    <span className="text-white ml-2">{formatFileSize(previewModal.file.size)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">업로드:</span>
                    <span className="text-white ml-2">{formatDate(previewModal.file.uploadedAt)}</span>
                  </div>
                  {previewModal.file.dimensions && (
                    <div>
                      <span className="text-gray-400">해상도:</span>
                      <span className="text-white ml-2">
                        {previewModal.file.dimensions.width}×{previewModal.file.dimensions.height}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* URL Section */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">
                    {previewModal.file.type === 'image' ? '이미지 URL:' : '비디오 URL:'}
                  </span>
                  <button
                    onClick={() => copyToClipboard(previewModal.file!.url)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors cursor-pointer"
                  >
                    URL 복사
                  </button>
                </div>
                <div className="bg-gray-900 rounded p-3">
                  <code className="text-green-400 text-sm break-all">{previewModal.file.url}</code>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex justify-end p-6 border-t border-gray-800 space-x-3 flex-shrink-0">
              <button
                onClick={() => {
                  const link = document.createElement("a");
                  link.href = previewModal.file!.url;
                  link.download = previewModal.file!.name;
                  link.click();
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                다운로드
              </button>
              <button
                onClick={() => setPreviewModal({ isOpen: false, file: null })}
                className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors cursor-pointer "
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed top-4 right-4 z-50 animate-slideInRight">
          <div className={`rounded-lg px-4 py-3 shadow-xl border-l-4 backdrop-blur-sm ${
            toast.type === 'success' 
              ? 'bg-green-600/95 text-white border-green-400' 
              : 'bg-red-600/95 text-white border-red-400'
          }`}>
            <div className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full animate-pulse ${
                toast.type === 'success' ? 'bg-green-300' : 'bg-red-300'
              }`}></div>
              <span className="text-sm font-medium">{toast.message}</span>
              <button
                onClick={closeToast}
                className="text-white/80 hover:text-white transition-all duration-200 hover:scale-110 transform cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
