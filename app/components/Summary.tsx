import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-600'
            : score > 49
        ? 'text-yellow-600' : 'text-red-600';
    
    const statusColor = score > 70 ? 'text-green-600' 
            : score > 49 
        ? 'text-yellow-600' : 'text-red-600';
            
    const statusText = score > 70 ? 'Strong' 
            : score > 49 
        ? 'Good' : 'Needs Work';

    return (
        <div className="flex flex-row items-center justify-between py-4 px-4 border-t border-gray-100 hover:bg-gray-50 transition-colors duration-200">
            <div className="flex items-center gap-3">
                <div className="text-2xl font-bold">
                    <span className={textColor}>{score}</span>
                    <span className="text-gray-400">/100</span>
                </div>
                {score > 70 && (
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
                {score > 49 && score <= 70 && (
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                )}
                {score <= 49 && (
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                )}
            </div>
            <div className="flex flex-row gap-2 items-center">
                <p className="text-lg font-semibold text-gray-800">{title}</p>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${score > 70 ? 'bg-green-100 text-green-700' : score > 49 ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                    {statusText}
                </span>
            </div>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 w-full overflow-hidden">
            {/* Header Section with Gradient Background */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5">
                <div className="flex flex-row items-center gap-6">
                    <ScoreGauge score={feedback.overallScore} />
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl font-bold text-gray-800">Your Resume Score</h2>
                        <p className="text-sm text-gray-600">
                            Comprehensive analysis based on multiple evaluation criteria below.
                        </p>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div className="px-6 py-2">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary
