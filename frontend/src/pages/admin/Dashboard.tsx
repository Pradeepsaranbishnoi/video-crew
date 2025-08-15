import { useState, useEffect } from "react";
import { FolderOpen, MessageSquare, Upload, TrendingUp, Users, Eye, Calendar } from "lucide-react";
import Seo from "../../components/common/Seo";
import { apiService } from "../../services/api";

interface DashboardStats {
  totalPortfolio: number;
  totalContacts: number;
  totalMedia: number;
  monthlyViews: number;
}

export default function Dashboard() {
  console.log("Dashboard component rendering"); // Debug log

  const [stats, setStats] = useState<DashboardStats>({
    totalPortfolio: 0,
    totalContacts: 0,
    totalMedia: 0,
    monthlyViews: 0,
  });

  const [recentActivities] = useState([
    {
      id: 1,
      type: "contact",
      message: "새로운 문의가 접수되었습니다 - 김철수님",
      time: "2시간 전",
    },
    {
      id: 2,
      type: "portfolio",
      message: "포트폴리오 항목이 추가되었습니다 - Corporate Video",
      time: "5시간 전",
    },
    {
      id: 3,
      type: "media",
      message: "새로운 미디어 파일이 업로드되었습니다",
      time: "1일 전",
    },
    {
      id: 4,
      type: "contact",
      message: "문의 답변이 완료되었습니다 - 이영희님",
      time: "2일 전",
    },
  ]);

  // Load real stats from API
  useEffect(() => {
    console.log("Dashboard useEffect running"); // Debug log
    const loadStats = async () => {
      try {
        // Load portfolio items
        const portfolioItems = await apiService.getPortfolioItems();
        
        // Load contact inquiries
        const contactInquiries = await apiService.getContactInquiries();
        
        // Calculate stats
        const totalPortfolio = portfolioItems.length;
        const totalContacts = contactInquiries.length;
        const totalMedia = portfolioItems.length; // For now, using portfolio count as media count
        const monthlyViews = Math.floor(Math.random() * 20000) + 5000; // Mock views for now
        
        setStats({
          totalPortfolio,
          totalContacts,
          totalMedia,
          monthlyViews,
        });
      } catch (error) {
        console.error('Failed to load dashboard stats:', error);
        // Fallback to default stats
        setStats({
          totalPortfolio: 0,
          totalContacts: 0,
          totalMedia: 0,
          monthlyViews: 0,
        });
      }
    };

    loadStats();
  }, []);

  const statCards = [
    {
      title: "총 포트폴리오",
      value: stats.totalPortfolio,
      icon: FolderOpen,
      color: "bg-blue-600",
      change: "+12%",
    },
    {
      title: "문의 건수",
      value: stats.totalContacts,
      icon: MessageSquare,
      color: "bg-green-600",
      change: "+8%",
    },
    {
      title: "미디어 파일",
      value: stats.totalMedia,
      icon: Upload,
      color: "bg-purple-600",
      change: "+15%",
    },
    {
      title: "월간 조회수",
      value: stats.monthlyViews.toLocaleString(),
      icon: Eye,
      color: "bg-orange-600",
      change: "+23%",
    },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "contact":
        return MessageSquare;
      case "portfolio":
        return FolderOpen;
      case "media":
        return Upload;
      default:
        return Calendar;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "contact":
        return "text-green-400";
      case "portfolio":
        return "text-blue-400";
      case "media":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  console.log("Dashboard about to return JSX"); // Debug log

  return (
    <div className="space-y-6">
      <Seo title="Admin Dashboard" description="비디오크루 관리자 – 대시보드 통계와 최근 활동 관리" />
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2 font-korean">관리자 대시보드에 오신 것을 환영합니다!</h2>
        <p className="text-blue-100 font-korean">비디오크루 웹사이트의 모든 콘텐츠를 관리할 수 있습니다.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-green-400 text-sm font-medium">{card.change}</span>
              </div>
              <h3 className="text-gray-400 text-sm font-medium font-korean">{card.title}</h3>
              <p className="text-2xl font-bold text-white mt-1">{card.value}</p>
            </div>
          );
        })}
      </div>

      {/* Recent Activities & Quick Actions */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activities */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4 flex items-center font-korean">
            <TrendingUp className="w-5 h-5 mr-2" />
            최근 활동
          </h3>
          <div className="space-y-4">
            {recentActivities.map((activity) => {
              const Icon = getActivityIcon(activity.type);
              const colorClass = getActivityColor(activity.type);

              return (
                <div key={activity.id} className="flex items-start space-x-3 p-3 bg-gray-800/50 rounded-lg">
                  <div className={`p-2 rounded-lg bg-gray-800 ${colorClass}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-300 text-sm font-korean">{activity.message}</p>
                    <p className="text-gray-500 text-xs mt-1 font-korean">{activity.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <h3 className="text-xl font-semibold text-white mb-4 font-korean">빠른 작업</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors text-left">
              <FolderOpen className="w-6 h-6 text-white mb-2" />
              <p className="text-white font-medium font-korean">포트폴리오 추가</p>
              <p className="text-blue-200 text-sm font-korean">새 작품 등록</p>
            </button>

            <button className="p-4 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-left">
              <MessageSquare className="w-6 h-6 text-white mb-2" />
              <p className="text-white font-medium font-korean">문의 확인</p>
              <p className="text-green-200 text-sm font-korean">새 문의 {stats.totalContacts}건</p>
            </button>

            <button className="p-4 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors text-left">
              <Upload className="w-6 h-6 text-white mb-2" />
              <p className="text-white font-medium font-korean">미디어 업로드</p>
              <p className="text-purple-200 text-sm font-korean">파일 관리</p>
            </button>

            <button className="p-4 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors text-left">
              <Users className="w-6 h-6 text-white mb-2" />
              <p className="text-white font-medium font-korean">사용자 관리</p>
              <p className="text-orange-200 text-sm font-korean">계정 설정</p>
            </button>
          </div>
        </div>
      </div>

      {/* System Status */}
      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h3 className="text-xl font-semibold text-white mb-4 font-korean">시스템 상태</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <span className="text-gray-300 font-korean">웹사이트 상태</span>
            <span className="flex items-center text-green-400 font-korean">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              정상
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <span className="text-gray-300 font-korean">데이터베이스</span>
            <span className="flex items-center text-green-400 font-korean">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
              연결됨
            </span>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
            <span className="text-gray-300 font-korean">백업 상태</span>
            <span className="flex items-center text-yellow-400 font-korean">
              <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></div>
              진행 중
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
