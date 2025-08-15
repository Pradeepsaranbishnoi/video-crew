import { useState, useEffect } from "react";
import { Search, Filter, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react";
import Seo from "../../components/common/Seo";
import { apiService } from "../../services/api";

interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  subject: string;
  message: string;
  budget: string;
  purpose: string;
  status: "new" | "processing" | "completed";
  createdAt: string;
  updatedAt: string;
}

export default function ContactsAdmin() {
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedContact, setSelectedContact] = useState<ContactInquiry | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Load real contact data from API
  useEffect(() => {
    const loadContacts = async () => {
      try {
        setIsLoading(true);
        const apiContacts = await apiService.getContactInquiries();
        
        // Transform API data to match our interface
        const transformedContacts: ContactInquiry[] = apiContacts.map((contact: any) => ({
          id: contact._id,
          name: contact.name,
          email: contact.email,
          company: extractCompanyFromMessage(contact.message) || "개인",
          subject: contact.subject,
          message: contact.message,
          budget: extractBudgetFromMessage(contact.message) || "상담 후 결정",
          purpose: extractPurposeFromMessage(contact.message) || "기타",
          status: contact.status || "new",
          createdAt: contact.createdAt || new Date().toISOString(),
          updatedAt: contact.updatedAt || new Date().toISOString(),
        }));

        setContacts(transformedContacts);
      } catch (error) {
        console.error('Failed to load contact inquiries:', error);
        // Fallback to empty array
        setContacts([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadContacts();
  }, []);

  // Helper functions to extract data from message
  const extractCompanyFromMessage = (message: string): string => {
    const companyMatch = message.match(/회사명[:\s]*([^\n]+)/i) || 
                        message.match(/Company[:\s]*([^\n]+)/i) ||
                        message.match(/회사[:\s]*([^\n]+)/i);
    return companyMatch ? companyMatch[1].trim() : "";
  };

  const extractBudgetFromMessage = (message: string): string => {
    const budgetMatch = message.match(/예산[:\s]*([^\n]+)/i) || 
                       message.match(/Budget[:\s]*([^\n]+)/i) ||
                       message.match(/(\d+[-\s]*\d*만원)/i);
    return budgetMatch ? budgetMatch[1].trim() : "";
  };

  const extractPurposeFromMessage = (message: string): string => {
    const purposeMatch = message.match(/목적[:\s]*([^\n]+)/i) || 
                        message.match(/Purpose[:\s]*([^\n]+)/i) ||
                        message.match(/제작 목적[:\s]*([^\n]+)/i);
    return purposeMatch ? purposeMatch[1].trim() : "";
  };

  // Filter contacts
  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || contact.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "new":
        return { label: "신규", icon: Clock, color: "bg-blue-500" };
      case "processing":
        return { label: "처리중", icon: AlertCircle, color: "bg-yellow-500" };
      case "completed":
        return { label: "완료", icon: CheckCircle, color: "bg-green-500" };
      default:
        return { label: "알 수 없음", icon: Clock, color: "bg-gray-500" };
    }
  };

  const handleStatusChange = async (id: string, newStatus: "new" | "processing" | "completed") => {
    try {
      await apiService.updateContactInquiry(id, { status: newStatus });
      
      setContacts((prev) =>
        prev.map((contact) =>
          contact.id === id ? { ...contact, status: newStatus, updatedAt: new Date().toISOString() } : contact,
        ),
      );
    } catch (error) {
      console.error("Status change failed:", error);
      alert("상태 변경에 실패했습니다. 다시 시도해주세요.");
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
      <Seo title="Admin Contacts" description="비디오크루 관리자 – 문의 목록 조회 및 상태 관리" />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-korean">문의 관리</h2>
          <p className="text-gray-400 font-korean">고객 문의를 관리하고 답변할 수 있습니다.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <span className="font-korean">신규: {contacts.filter((c) => c.status === "new").length}</span>
          <span className="font-korean">처리중: {contacts.filter((c) => c.status === "processing").length}</span>
          <span className="font-korean">완료: {contacts.filter((c) => c.status === "completed").length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="이름, 이메일, 회사, 제목 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white focus:border-blue-500 focus:outline-none appearance-none"
            >
              <option value="all">모든 상태</option>
              <option value="new">신규</option>
              <option value="processing">처리중</option>
              <option value="completed">완료</option>
            </select>
          </div>

          <div className="flex items-center text-gray-400 font-korean">총 {filteredContacts.length}개 문의</div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="space-y-4">
        {filteredContacts.map((contact) => {
          const statusInfo = getStatusInfo(contact.status);
          const StatusIcon = statusInfo.icon;

          return (
            <div key={contact.id} className="bg-gray-900 rounded-xl border border-gray-800 p-6">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                                             <h3 className="text-white font-semibold text-lg font-korean">{contact.name}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                                                 <span className="font-english">{contact.email}</span>
                         <span>•</span>
                         <span className="font-korean">{contact.company}</span>
                         <span>•</span>
                         <span className="font-korean">{formatDate(contact.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs ${statusInfo.color} text-white flex items-center space-x-1`}>
                        <StatusIcon className="w-3 h-3" />
                        <span>{statusInfo.label}</span>
                      </span>
                    </div>
                  </div>

                  <div className="mb-3">
                                         <h4 className="text-white font-medium mb-1 font-korean">{contact.subject}</h4>
                     <p className="text-gray-300 text-sm line-clamp-2 font-korean">{contact.message}</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                         <div>
                       <span className="text-gray-400 font-korean">예산:</span>
                       <span className="text-white ml-1 font-korean">{contact.budget}</span>
                     </div>
                     <div>
                       <span className="text-gray-400 font-korean">목적:</span>
                       <span className="text-white ml-1 font-korean">{contact.purpose}</span>
                     </div>
                  </div>
                </div>

                <div className="lg:w-48 flex flex-col space-y-2">
                                     <h4 className="text-white font-medium text-sm font-korean">상태 변경</h4>
                  <div className="flex flex-col space-y-1">
                    {(["new", "processing", "completed"] as const).map((status) => (
                      <button
                        key={status}
                        onClick={() => handleStatusChange(contact.id, status)}
                        className={`text-left px-3 py-2 rounded text-sm transition-colors ${
                          contact.status === status
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                                                 <span className="font-korean">{status === "new" ? "신규" : status === "processing" ? "처리중" : "완료"}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex space-x-2 mt-4">
                    <button
                      onClick={() => {
                        setSelectedContact(contact);
                        setShowDetailModal(true);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-3 rounded text-sm transition-colors"
                    >
                                             <span className="font-korean">상세보기</span>
                     </button>
                     <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-3 rounded text-sm transition-colors">
                       <span className="font-korean">답변하기</span>
                     </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredContacts.length === 0 && (
        <div className="text-center py-12">
                     <div className="text-gray-400 mb-4 font-korean">
             {searchTerm || filterStatus !== "all" ? "검색 결과가 없습니다." : "문의가 없습니다."}
           </div>
          {searchTerm || filterStatus !== "all" ? (
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterStatus("all");
              }}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
                             <span className="font-korean">필터 초기화</span>
             </button>
          ) : null}
        </div>
      )}

      {/* Detail Modal */}
      {showDetailModal && selectedContact && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl border border-gray-800 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">문의 상세보기</h3>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedContact(null);
                  }}
                  className="text-gray-400 hover:text-white"
                >
                  <MessageSquare className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-400">이름</label>
                  <p className="text-white">{selectedContact.name}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400">이메일</label>
                  <p className="text-white">{selectedContact.email}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400">회사</label>
                  <p className="text-white">{selectedContact.company}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400">제목</label>
                  <p className="text-white">{selectedContact.subject}</p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-400">메시지</label>
                  <p className="text-gray-300 leading-relaxed">{selectedContact.message}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400">예산</label>
                    <p className="text-white">{selectedContact.budget}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">목적</label>
                    <p className="text-white">{selectedContact.purpose}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-400">접수일</label>
                    <p className="text-white">{formatDate(selectedContact.createdAt)}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-400">수정일</label>
                    <p className="text-white">{formatDate(selectedContact.updatedAt)}</p>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-800">
                  <button
                    onClick={() => {
                      setShowDetailModal(false);
                      setSelectedContact(null);
                    }}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    닫기
                  </button>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    답변하기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
