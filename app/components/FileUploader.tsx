import {useState, useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import { formatSize } from '../lib/utils'
import { Upload as UploadIcon, FileText, X } from 'lucide-react'

interface FileUploaderProps {
    onFileSelect?: (file: File | null) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0] || null;
        onFileSelect?.(file);
    }, [onFileSelect]);

    const maxFileSize = 20 * 1024 * 1024; // 20MB in bytes

    const {getRootProps, getInputProps, isDragActive, acceptedFiles} = useDropzone({
        onDrop,
        multiple: false,
        accept: { 'application/pdf': ['.pdf']},
        maxSize: maxFileSize,
    })

    const file = acceptedFiles[0] || null;

    return (
        <div className="w-full">
            <div {...getRootProps()}>
                <input {...getInputProps()} />
                
                {file ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                                <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-red-500" />
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {file.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {formatSize(file.size)}
                                </p>
                            </div>
                            <button 
                                className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-md transition-colors duration-200"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onFileSelect?.(null);
                                }}
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                    </div>
                ): (
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-200 ${
                        isDragActive 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                    }`}>
                        <div className="flex flex-col items-center space-y-4">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                                <UploadIcon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {isDragActive ? 'Drop your file here' : 'Upload your resume'}
                                </h3>
                                <p className="text-gray-600 mt-1">
                                    <span className="font-medium">Click to browse</span> or drag and drop
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    PDF only • Maximum size: {formatSize(maxFileSize)}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default FileUploader