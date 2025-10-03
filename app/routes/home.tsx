import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import {usePuterStore} from "~/lib/puter";
import {Link, useNavigate} from "react-router";
import {useEffect, useState} from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { 
  FileText, 
  Upload as UploadIcon, 
  TrendingUp, 
  Building, 
  Award,
  Search,
  AlertCircle 
} from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "ProfileSense" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if(!auth.isAuthenticated) navigate('/auth?next=/');
  }, [auth.isAuthenticated])

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list('resume:*', true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => (
          JSON.parse(resume.value) as Resume
      ))

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    }

    loadResumes()
  }, []);

  const averageScore = resumes.length > 0 
    ? Math.round(resumes.reduce((sum, resume) => sum + (resume.feedback?.overallScore || 0), 0) / resumes.length)
    : 0;

  const uniqueCompanies = resumes.length > 0 
    ? new Set(resumes.map(r => r.companyName)).size 
    : 0;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Resume Analytics Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {!loadingResumes && resumes?.length === 0 
              ? "Get started by uploading your first resume for professional AI analysis"
              : `Track your ${resumes.length} application${resumes.length !== 1 ? 's' : ''} and monitor your career progress`
            }
          </p>
        </div>

        {/* Quick Upload CTA for users with no resumes */}
        {!loadingResumes && resumes?.length === 0 && (
          <Card className="mb-6 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <UploadIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-semibold text-gray-900">Ready to get started?</h3>
                    <p className="text-gray-600">Upload your first resume and get instant AI feedback</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <Button asChild size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700">
                    <Link to="/upload">
                      <UploadIcon className="w-4 h-4 mr-2" />
                      Upload Resume
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {loadingResumes && (
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="flex flex-col items-center space-y-6 p-8">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute inset-0 w-16 h-16 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Initializing your dashboard...</h3>
                  <p className="text-gray-600">Getting everything ready for you</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {!loadingResumes && resumes.length > 0 && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Applications</p>
                      <p className="text-2xl font-bold text-gray-900">{resumes.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Average Score</p>
                      <p className="text-2xl font-bold text-gray-900">
                        {averageScore > 0 ? `${averageScore}%` : 'No scores yet'}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Companies Applied</p>
                      <p className="text-2xl font-bold text-gray-900">{uniqueCompanies}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resume Applications */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Your Resume Applications</h2>
                  <p className="text-gray-600">Manage and review your submitted applications</p>
                </div>
                <Button asChild>
                  <Link to="/upload">
                    <UploadIcon className="w-4 h-4 mr-2" />
                    Upload New Resume
                  </Link>
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resumes.map((resume) => (
                  <ResumeCard key={resume.id} resume={resume} />
                ))}
              </div>
            </div>
          </div>
        )}

        {!loadingResumes && resumes?.length === 0 && (
          <Card className="text-center">
            <CardContent className="pt-8">
              <div className="flex flex-col items-center space-y-6 p-8">
                <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                  <FileText className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">No resume analysis yet</h3>
                  <p className="text-gray-600 mb-8">Upload your first resume to get professional feedback and improve your job applications</p>
                  <Button asChild size="lg">
                    <Link to="/upload">
                      <UploadIcon className="w-5 h-5 mr-2" />
                      Upload Resume
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
