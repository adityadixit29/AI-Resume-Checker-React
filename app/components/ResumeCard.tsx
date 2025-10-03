import {Link} from "react-router";
import {useEffect, useState} from "react";
import {usePuterStore} from "~/lib/puter";
import { Card, CardContent } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Building, Briefcase, TrendingUp, ChevronRight, FileText, ImageOff } from "lucide-react";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState('');
    const [imageLoading, setImageLoading] = useState(true);
    const [imageError, setImageError] = useState(false);

    useEffect(() => {
        // For now, just show fallback immediately
        setImageLoading(false);
        setImageError(true);
        setResumeUrl('');
        
        // Comment out the actual loading logic until blob issue is resolved
        /*
        const loadResume = async () => {
            try {
                setImageLoading(true);
                setImageError(false);
                
                if (!imagePath) {
                    setImageError(true);
                    setImageLoading(false);
                    return;
                }

                const blob = await fs.read(imagePath);
                if (!blob) {
                    setImageError(true);
                    setImageLoading(false);
                    return;
                }
                
                console.log('Blob details:', {
                    type: blob.type,
                    size: blob.size,
                    path: imagePath
                });
                
                // Test if the blob is valid by checking if it can be read
                const testReader = new FileReader();
                testReader.onload = () => {
                    console.log('Blob can be read, length:', testReader.result?.length);
                };
                testReader.readAsDataURL(blob.slice(0, 100)); // Read first 100 bytes
                
                const url = URL.createObjectURL(blob);
                if (!url || url === 'blob:') {
                    console.log('Invalid blob URL created');
                    setImageError(true);
                    setImageLoading(false);
                    return;
                }
                
                console.log('Created blob URL:', url);
                setResumeUrl(url);
                setImageLoading(false);
            } catch (error) {
                console.error('Error loading resume image:', error);
                setImageError(true);
                setImageLoading(false);
            }
        }

        loadResume();
        */
    }, [imagePath]);

    const getScoreColor = (score: number) => {
        if (score >= 80) return 'bg-green-100 text-green-800 border-green-200';
        if (score >= 60) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        return 'bg-red-100 text-red-800 border-red-200';
    };

    const getScoreLabel = (score: number) => {
        if (score >= 80) return 'Excellent';
        if (score >= 60) return 'Good';
        return 'Needs Improvement';
    };

    return (
        <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer hover:-translate-y-1">
            <Link to={`/resume/${id}`} className="block">
                <CardContent className="p-0">
                    {/* Header */}
                    <div className="p-6 pb-4">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-2">
                                    <Building className="w-4 h-4 text-gray-500" />
                                    <h3 className="text-lg font-semibold text-gray-900 truncate">
                                        {companyName || 'Resume'}
                                    </h3>
                                </div>
                                {jobTitle && (
                                    <div className="flex items-center gap-2">
                                        <Briefcase className="w-4 h-4 text-gray-400" />
                                        <p className="text-sm text-gray-600 truncate">
                                            {jobTitle}
                                        </p>
                                    </div>
                                )}
                            </div>
                            <Badge 
                                variant="outline" 
                                className={`px-2 py-1 text-xs font-medium ${getScoreColor(feedback.overallScore)}`}
                            >
                                {feedback.overallScore}%
                            </Badge>
                        </div>

                        {/* Resume Preview */}
                        <div className="mb-4">
                            <div className="relative rounded-lg overflow-hidden bg-gray-50 border h-48">
                                {imageLoading && (
                                    <div className="flex items-center justify-center h-full">
                                        <div className="flex items-center space-x-3 text-gray-500">
                                            <div className="w-6 h-6 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                                            <span className="text-sm">Loading preview...</span>
                                        </div>
                                    </div>
                                )}
                                
                                {imageError && (
                                    <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-gray-50 to-gray-100 border-2 border-dashed border-gray-300">
                                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center mb-3">
                                            <FileText className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-sm font-medium text-gray-700 mb-1">Resume Preview</p>
                                            <p className="text-xs text-gray-500">
                                                {companyName}{jobTitle ? ` • ${jobTitle}` : ''}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                
                                {/* Always show fallback for now - comment out actual image until blob issue is resolved */}
                                {/* {resumeUrl && !imageError && !imageLoading && (
                                    <>
                                        <img
                                            src={resumeUrl}
                                            alt="resume preview"
                                            className="w-full h-full object-contain bg-white"
                                            onError={(e) => {
                                                console.log('Image failed to load:', resumeUrl);
                                                console.log('Error event:', e);
                                                setImageError(true);
                                            }}
                                            onLoad={() => {
                                                console.log('Image loaded successfully');
                                            }}
                                            style={{ 
                                                display: 'block',
                                                backgroundColor: '#ffffff'
                                            }}
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 pointer-events-none" />
                                    </>
                                )} */}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <TrendingUp className={`w-4 h-4 ${
                                    feedback.overallScore >= 80 ? 'text-green-600' : 
                                    feedback.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                                }`} />
                                <span className={`text-xs font-medium ${
                                    feedback.overallScore >= 80 ? 'text-green-600' : 
                                    feedback.overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                                }`}>
                                    {getScoreLabel(feedback.overallScore)}
                                </span>
                            </div>
                            <div className="flex items-center text-blue-600 group-hover:text-blue-800 transition-colors">
                                <span className="text-sm font-medium mr-1">View Details</span>
                                <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Link>
        </Card>
    )
}

export default ResumeCard