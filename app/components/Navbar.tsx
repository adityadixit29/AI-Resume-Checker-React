import {Link} from "react-router";
import { Button } from "~/components/ui/button";
import { FileText, Upload as UploadIcon } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-xl font-bold text-gray-900">ProfileSense</span>
                    </Link>
                    
                    <Button asChild>
                        <Link to="/upload">
                            <UploadIcon className="w-4 h-4 mr-2" />
                            Upload Resume
                        </Link>
                    </Button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
