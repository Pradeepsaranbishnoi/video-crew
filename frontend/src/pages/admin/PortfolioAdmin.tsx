import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Eye, Search, Filter, ArrowUpDown, X, Star } from "lucide-react";
import LazyImage from "../../components/common/LazyImage";
import Seo from "../../components/common/Seo";
import { apiService, type PortfolioItem as ApiPortfolioItem } from "../../services/api";

interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  client: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  featured: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

interface PortfolioFormData {
  title: string;
  category: string;
  client: string;
  description: string;
  thumbnail_url: string;
  video_url: string;
  featured: boolean;
  display_order: number;
}

export default function PortfolioAdmin() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [sortBy, setSortBy] = useState("display_order");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [viewingItem, setViewingItem] = useState<PortfolioItem | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<PortfolioFormData>({
    title: "",
    category: "",
    client: "",
    description: "",
    thumbnail_url: "",
    video_url: "",
    featured: false,
    display_order: 0,
  });

  // Load real portfolio data from API
  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setIsLoading(true);
        const apiItems = await apiService.getPortfolioItems();
        
        // Transform API data to match our interface
        const transformedItems: PortfolioItem[] = apiItems.map((item: ApiPortfolioItem) => ({
          id: item._id,
          title: item.title,
          category: item.category,
          client: item.client || "",
          description: item.description || "",
          thumbnail_url: item.thumbnail_url,
          video_url: item.video_url,
          featured: item.featured || false,
          display_order: item.display_order || 0,
          created_at: item.createdAt || new Date().toISOString(),
          updated_at: item.updatedAt || new Date().toISOString(),
        }));

        setPortfolioItems(transformedItems);
      } catch (error) {
        console.error('Failed to load portfolio items:', error);
        // Fallback to empty array
        setPortfolioItems([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPortfolio();
  }, []);

  const categories = ["all", "Corporate", "Commercial", "Music Video", "Documentary", "Event", "Branding"];

  // Filter and sort items
  const filteredItems = portfolioItems
    .filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "all" || item.category === filterCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "display_order":
          return a.display_order - b.display_order;
        case "title":
          return a.title.localeCompare(b.title);
        case "created_at":
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
        default:
          return 0;
      }
    });

  const resetForm = () => {
    setFormData({
      title: "",
      category: "",
      client: "",
      description: "",
      thumbnail_url: "",
      video_url: "",
      featured: false,
      display_order: portfolioItems.length + 1,
    });
  };

  const handleAdd = () => {
    resetForm();
    setFormData((prev) => ({ ...prev, display_order: portfolioItems.length + 1 }));
    setShowAddModal(true);
  };

  const handleEdit = (item: PortfolioItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      category: item.category,
      client: item.client,
      description: item.description,
      thumbnail_url: item.thumbnail_url,
      video_url: item.video_url,
      featured: item.featured,
      display_order: item.display_order,
    });
    setShowEditModal(true);
  };

  const handleView = (item: PortfolioItem) => {
    setViewingItem(item);
    setShowViewModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (showAddModal) {
        // Add new item via API
        const newItem = await apiService.createPortfolioItem({
          title: formData.title,
          category: formData.category,
          client: formData.client,
          description: formData.description,
          thumbnail_url: formData.thumbnail_url,
          video_url: formData.video_url,
          featured: formData.featured,
          display_order: formData.display_order,
        });
        
        // Add to local state
        const transformedItem: PortfolioItem = {
          id: newItem._id,
          title: newItem.title,
          category: newItem.category,
          client: newItem.client || "",
          description: newItem.description || "",
          thumbnail_url: newItem.thumbnail_url,
          video_url: newItem.video_url,
          featured: newItem.featured || false,
          display_order: newItem.display_order || 0,
          created_at: newItem.createdAt || new Date().toISOString(),
          updated_at: newItem.updatedAt || new Date().toISOString(),
        };
        
        setPortfolioItems((prev) => [transformedItem, ...prev]);
        setShowAddModal(false);
      } else if (showEditModal && editingItem) {
        // Update existing item via API
        const updatedItem = await apiService.updatePortfolioItem(editingItem.id, {
          title: formData.title,
          category: formData.category,
          client: formData.client,
          description: formData.description,
          thumbnail_url: formData.thumbnail_url,
          video_url: formData.video_url,
          featured: formData.featured,
          display_order: formData.display_order,
        });
        
        // Update local state
        setPortfolioItems((prev) =>
          prev.map((item) =>
            item.id === editingItem.id ? {
              ...item,
              title: updatedItem.title,
              category: updatedItem.category,
              client: updatedItem.client || "",
              description: updatedItem.description || "",
              thumbnail_url: updatedItem.thumbnail_url,
              video_url: updatedItem.video_url,
              featured: updatedItem.featured || false,
              display_order: updatedItem.display_order || 0,
              updated_at: updatedItem.updatedAt || new Date().toISOString(),
            } : item,
          ),
        );
        setShowEditModal(false);
        setEditingItem(null);
      }

      resetForm();
    } catch (error) {
      console.error("Submit failed:", error);
      alert("포트폴리오 저장에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("정말로 이 포트폴리오 항목을 삭제하시겠습니까?")) {
      try {
        await apiService.deletePortfolioItem(id);
        setPortfolioItems((prev) => prev.filter((item) => item.id !== id));
      } catch (error) {
        console.error("Delete failed:", error);
        alert("포트폴리오 삭제에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const item = portfolioItems.find(item => item.id === id);
      if (!item) return;
      
      const updatedItem = await apiService.updatePortfolioItem(id, {
        featured: !item.featured
      });
      
      setPortfolioItems((prev) =>
        prev.map((item) =>
          item.id === id ? { 
            ...item, 
            featured: updatedItem.featured || false, 
            updated_at: updatedItem.updatedAt || new Date().toISOString() 
          } : item,
        ),
      );
    } catch (error) {
      console.error("Toggle featured failed:", error);
      alert("추천 상태 변경에 실패했습니다. 다시 시도해주세요.");
    }
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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Seo title="Admin Portfolio" description="비디오크루 관리자 – 포트폴리오 항목 추가/편집/삭제 및 상세 보기" />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-korean">포트폴리오 관리</h2>
          <p className="text-gray-400 font-korean">포트폴리오 항목을 추가, 편집, 삭제할 수 있습니다.</p>
        </div>
        <button 
          onClick={handleAdd} 
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span className="font-korean">새 포트폴리오 추가</span>
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="제목, 클라이언트, 설명 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none appearance-none"
            >
              {categories.map((category) => (
                <option key={category} value={category} className="bg-gray-800">
                  {category === "all" ? "모든 카테고리" : category}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <ArrowUpDown className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none appearance-none"
            >
              <option value="display_order" className="bg-gray-800">
                순서
              </option>
              <option value="title" className="bg-gray-800">
                제목
              </option>
              <option value="created_at" className="bg-gray-800">
                생성일
              </option>
            </select>
          </div>

          <div className="flex items-center text-gray-400 font-korean">총 {filteredItems.length}개 항목</div>
        </div>
      </div>

      {/* Portfolio Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div key={item.id} className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
            <div className="relative h-48">
              <LazyImage 
                src={item.thumbnail_url || "/placeholder.svg"} 
                alt={item.title} 
                className="w-full h-full object-cover"
              />
              {item.featured && (
                <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                  <Star className="w-3 h-3" />
                  <span>추천</span>
                </div>
              )}
              <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                #{item.display_order}
              </div>
            </div>

            <div className="p-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-white text-sm line-clamp-1 font-english">{item.title}</h3>
              </div>

              <p className="text-xs text-blue-400 mb-1 font-english">{item.category}</p>
              <p className="text-xs text-gray-400 mb-2 font-english">{item.client}</p>
              <p className="text-xs text-gray-300 mb-4 line-clamp-2 font-korean">{item.description}</p>

              <div className="text-xs text-gray-500 mb-3 font-korean">{formatDate(item.created_at)}</div>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleToggleFeatured(item.id)}
                  className={`p-1 transition-colors ${
                    item.featured ? "text-yellow-400" : "text-gray-400 hover:text-yellow-400"
                  }`}
                  title="추천 토글"
                >
                  <Star className="w-4 h-4" />
                </button>

                <div className="flex space-x-1">
                  <button
                    onClick={() => handleView(item)}
                    className="p-1 text-gray-400 hover:text-blue-400 transition-colors"
                    title="상세보기"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleEdit(item)}
                    className="p-1 text-gray-400 hover:text-green-400 transition-colors"
                    title="편집"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                    title="삭제"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4 font-korean">
            {searchTerm || filterCategory !== "all" ? "검색 결과가 없습니다." : "포트폴리오 항목이 없습니다."}
          </div>
          {searchTerm || filterCategory !== "all" ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("all");
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <span className="font-korean">필터 초기화</span>
            </button>
          ) : (
            <button onClick={handleAdd} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
              <span className="font-korean">첫 번째 포트폴리오 추가</span>
            </button>
          )}
        </div>
      )}

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">
                  {showAddModal ? "새 포트폴리오 추가" : "포트폴리오 편집"}
                </h3>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    setEditingItem(null);
                    resetForm();
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">제목 *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">카테고리 *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                      required
                    >
                      <option value="">카테고리 선택</option>
                      {categories.slice(1).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">클라이언트</label>
                    <input
                      type="text"
                      value={formData.client}
                      onChange={(e) => setFormData((prev) => ({ ...prev, client: e.target.value }))}
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">표시 순서</label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, display_order: Number.parseInt(e.target.value) || 0 }))
                      }
                      className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">썸네일 URL *</label>
                  <input
                    type="url"
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, thumbnail_url: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="https://example.com/image.jpg"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">비디오 URL *</label>
                  <input
                    type="url"
                    value={formData.video_url}
                    onChange={(e) => setFormData((prev) => ({ ...prev, video_url: e.target.value }))}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
                    placeholder="https://example.com/video.mp4"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">설명</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="포트폴리오에 대한 자세한 설명을 입력하세요..."
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 bg-gray-800 border-gray-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="ml-2 text-sm text-gray-300">
                    추천 포트폴리오로 설정
                  </label>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-800">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setEditingItem(null);
                      resetForm();
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    취소
                  </button>
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {isSubmitting ? "저장 중..." : showAddModal ? "추가" : "수정"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {showViewModal && viewingItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">포트폴리오 상세보기</h3>
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    setViewingItem(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <div className="relative h-64 mb-4 rounded-lg overflow-hidden">
                    <LazyImage
                      src={viewingItem.thumbnail_url || "/placeholder.svg"}
                      alt={viewingItem.title}
                      className="w-full h-full object-cover"
                    />
                    {viewingItem.featured && (
                      <div className="absolute top-2 left-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-medium flex items-center space-x-1">
                        <Star className="w-3 h-3" />
                        <span className="font-korean">추천</span>
                      </div>
                    )}
                  </div>

                  <div className="aspect-video">
                    <video controls className="w-full h-full rounded-lg" poster={viewingItem.thumbnail_url}>
                      <source src={viewingItem.video_url} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">{viewingItem.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>{viewingItem.category}</span>
                      <span>•</span>
                      <span>#{viewingItem.display_order}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-400">클라이언트</label>
                    <p className="text-white">{viewingItem.client || "미지정"}</p>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-400">설명</label>
                    <p className="text-gray-300 leading-relaxed">{viewingItem.description || "설명이 없습니다."}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-400">생성일</label>
                      <p className="text-white">{formatDate(viewingItem.created_at)}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-400">수정일</label>
                      <p className="text-white">{formatDate(viewingItem.updated_at)}</p>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-400">URL 정보</label>
                    <div className="space-y-2 mt-2">
                      <div>
                        <p className="text-xs text-gray-500">썸네일</p>
                        <p className="text-xs text-blue-400 break-all">{viewingItem.thumbnail_url}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">비디오</p>
                        <p className="text-xs text-blue-400 break-all">{viewingItem.video_url}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
                    <button
                      onClick={() => {
                        setShowViewModal(false);
                        handleEdit(viewingItem);
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      편집
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
