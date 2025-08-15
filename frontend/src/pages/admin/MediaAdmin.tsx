import React, { useState, useEffect, useRef } from "react";
import { Upload, ImageIcon, Video, Trash2, Search, Filter, Download, Eye } from "lucide-react";

interface MediaFile {
  id: number;
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
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mock data
  useEffect(() => {
    const loadMedia = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockData: MediaFile[] = [
        {
          id: 1,
          name: "corporate-video-thumbnail.jpg",
          type: "image",
          url: "/placeholder.svg?height=300&width=400",
          size: 245760,
          uploadedAt: "2024-01-15T10:30:00Z",
          dimensions: { width: 1920, height: 1080 },
        },
        {
          id: 2,
          name: "product-launch-video.mp4",
          type: "video",
          url: "https://example.com/video.mp4",
          size: 52428800,
          uploadedAt: "2024-01-14T14:20:00Z",
          dimensions: { width: 1920, height: 1080 },
        },
        {
          id: 3,
          name: "hero-background.jpg",
          type: "image",
          url: "/placeholder.svg?height=600&width=1200",
          size: 512000,
          uploadedAt: "2024-01-13T09:15:00Z",
          dimensions: { width: 1920, height: 1080 },
        },
        {
          id: 4,
          name: "music-video-preview.mp4",
          type: "video",
          url: "https://example.com/music-video.mp4",
          size: 78643200,
          uploadedAt: "2024-01-12T16:45:00Z",
          dimensions: { width: 1920, height: 1080 },
        },
      ];

      setMediaFiles(mockData);
      setIsLoading(false);
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
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const newFiles: MediaFile[] = Array.from(files).map((file, index) => ({
        id: Date.now() + index,
        name: file.name,
        type: file.type.startsWith("image/") ? "image" : "video",
        url: URL.createObjectURL(file),
        size: file.size,
        uploadedAt: new Date().toISOString(),
        dimensions: { width: 1920, height: 1080 },
      }));
      setMediaFiles((prev) => [...newFiles, ...prev]);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm("정말로 이 파일을 삭제하시겠습니까?")) {
      setMediaFiles((files) => files.filter((file) => file.id !== id));
    }
  };

  const handleSelectFile = (id: number) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((fileId) => fileId !== id) : [...prev, id],
    );
  };

  const handleBulkDelete = () => {
    if (selectedFiles.length === 0) return;
    if (confirm(`${selectedFiles.length}개의 파일을 삭제하시겠습니까?`)) {
      setMediaFiles((files) => files.filter((file) => !selectedFiles.includes(file.id)));
      setSelectedFiles([]);
    }
  };

  const totalSize = mediaFiles.reduce((sum, file) => sum + file.size, 0);
  const usedSpace = (totalSize / (1024 * 1024 * 1024)).toFixed(2); // GB

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-full object-cover rounded-t-xl"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23374151'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239CA3AF' font-family='Arial' font-size='12'%3E이미지 없음%3C/text%3E%3C/svg%3E";
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-800 rounded-t-xl flex items-center justify-center">
                    <Video className="w-12 h-12 text-gray-600" />
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
                        window.open(file.url, "_blank");
                      }}
                      className="p-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
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
                      className="p-2 bg-green-600 rounded-lg text-white hover:bg-green-700 transition-colors"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(file.id);
                      }}
                      className="p-2 bg-red-600 rounded-lg text-white hover:bg-red-700 transition-colors"
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
          <div className="text-gray-400 mb-4">
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
            <span className="text-white">{usedSpace} GB / 10 GB</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(parseFloat(usedSpace) / 10) * 100}%` }}
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
              <span className="text-white">{((parseFloat(usedSpace) / 10) * 100).toFixed(1)}%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
