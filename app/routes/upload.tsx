import {type FormEvent, useState} from 'react'
import Navbar from "~/components/Navbar";
import FileUploader from "~/components/FileUploader";
import {usePuterStore} from "~/lib/puter";
import {useNavigate} from "react-router";
import {convertPdfToImage} from "~/lib/pdf2img";
import {generateUUID} from "~/lib/utils";
import {prepareInstructions} from "../../constants";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import { Upload as UploadIcon, FileText, Building, Briefcase } from "lucide-react";

const Upload = () => {
    const { auth, isLoading, fs, ai, kv } = usePuterStore();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState(false);
    const [statusText, setStatusText] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileSelect = (file: File | null) => {
        setFile(file)
    }

    const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: { companyName: string, jobTitle: string, jobDescription: string, file: File  }) => {
        setIsProcessing(true);

        setStatusText('Uploading the file...');
        const uploadedFile = await fs.upload([file]);
        if(!uploadedFile) return setStatusText('Error: Failed to upload file');

        setStatusText('Converting to image...');
        const imageFile = await convertPdfToImage(file);
        if(!imageFile.file) return setStatusText('Error: Failed to convert PDF to image');

        setStatusText('Uploading the image...');
        const uploadedImage = await fs.upload([imageFile.file]);
        if(!uploadedImage) return setStatusText('Error: Failed to upload image');

        setStatusText('Preparing data...');
        const uuid = generateUUID();
        const data = {
            id: uuid,
            resumePath: uploadedFile.path,
            imagePath: uploadedImage.path,
            companyName, jobTitle, jobDescription,
            feedback: '',
        }
        await kv.set(`resume:${uuid}`, JSON.stringify(data));

        setStatusText('Analyzing...');

        const feedback = await ai.feedback(
            uploadedFile.path,
            prepareInstructions({ jobTitle, jobDescription })
        )
        if (!feedback) return setStatusText('Error: Failed to analyze resume');

        const feedbackText = typeof feedback.message.content === 'string'
            ? feedback.message.content
            : feedback.message.content[0].text;

        data.feedback = JSON.parse(feedbackText);
        await kv.set(`resume:${uuid}`, JSON.stringify(data));
        setStatusText('Analysis complete, redirecting...');
        console.log(data);
        navigate(`/resume/${uuid}`);
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const form = e.currentTarget.closest('form');
        if(!form) return;
        const formData = new FormData(form);

        const companyName = formData.get('company-name') as string;
        const jobTitle = formData.get('job-title') as string;
        const jobDescription = formData.get('job-description') as string;

        if(!file) return;

        handleAnalyze({ companyName, jobTitle, jobDescription, file });
    }

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Get Professional Resume Feedback
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Upload your resume and receive detailed ATS compatibility scores with personalized improvement recommendations.
                    </p>
                </div>

                {isProcessing ? (
                    <Card className="text-center">
                        <CardContent className="pt-8">
                            <div className="flex flex-col items-center space-y-6 p-8">
                                <div className="relative">
                                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                        <UploadIcon className="w-8 h-8 text-white" />
                                    </div>
                                    <div className="absolute inset-0 w-16 h-16 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{statusText}</h3>
                                    <p className="text-gray-600">Please wait while we analyze your resume...</p>
                                </div>
                                <img src="/images/resume-scan.gif" className="w-full max-w-md mx-auto rounded-lg shadow-lg" />
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="w-5 h-5 text-blue-600" />
                                Job Application Details
                            </CardTitle>
                            <CardDescription>
                                Provide information about the position you're applying for to get targeted feedback.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Company and Position */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label htmlFor="company-name" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Building className="w-4 h-4" />
                                            Company Name
                                        </label>
                                        <Input
                                            id="company-name"
                                            name="company-name"
                                            placeholder="e.g., Google, Microsoft, Apple"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="job-title" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" />
                                            Job Title
                                        </label>
                                        <Input
                                            id="job-title"
                                            name="job-title"
                                            placeholder="e.g., Software Engineer, Product Manager"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Job Description */}
                                <div className="space-y-2">
                                    <label htmlFor="job-description" className="text-sm font-medium text-gray-700">
                                        Job Description
                                    </label>
                                    <Textarea
                                        id="job-description"
                                        name="job-description"
                                        placeholder="Paste the job description or key requirements here to get targeted feedback..."
                                        rows={6}
                                        required
                                    />
                                </div>

                                {/* Resume Upload */}
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-700">
                                        Resume Upload
                                    </label>
                                    <FileUploader onFileSelect={handleFileSelect} />
                                </div>

                                {/* Submit Button */}
                                <Button 
                                    type="submit" 
                                    className="w-full" 
                                    size="lg"
                                    disabled={!file}
                                >
                                    <UploadIcon className="w-4 h-4 mr-2" />
                                    Analyze Resume
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}
            </div>
        </main>
    )
}

export default Upload