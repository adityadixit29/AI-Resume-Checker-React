import {usePuterStore} from "~/lib/puter";
import {useEffect} from "react";
import {useLocation, useNavigate} from "react-router";

export const meta = () => ([
    { title: 'Resumind | Auth' },
    { name: 'description', content: 'Log into your account' },
])

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if(auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Main authentication card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                    {/* Header section */}
                    <div className="px-8 pt-8 pb-6 text-center">
                        {/* Brand logo */}
                        <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-600 rounded-xl mb-4">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        
                        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                            Welcome to ProfileSense
                        </h1>
                        <p className="text-gray-600 text-sm leading-relaxed">
                            Professional resume analysis powered by AI
                        </p>
                    </div>

                    {/* Content section */}
                    <div className="px-8 pb-8">
                        {/* Value proposition */}
                        <div className="bg-gray-50 rounded-xl p-4 mb-6">
                            <div className="grid grid-cols-3 gap-3 text-center">
                                <div>
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs font-medium text-gray-700">Smart Analysis</p>
                                </div>
                                <div>
                                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs font-medium text-gray-700">ATS Ready</p>
                                </div>
                                <div>
                                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                                        <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <p className="text-xs font-medium text-gray-700">Instant Results</p>
                                </div>
                            </div>
                        </div>

                        {/* Authentication button */}
                        {isLoading ? (
                            <button className="w-full py-3 px-4 bg-blue-600 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 opacity-90">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>Authenticating...</span>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button 
                                        className="w-full py-3 px-4 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group"
                                        onClick={auth.signOut}
                                    >
                                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Sign Out</span>
                                    </button>
                                ) : (
                                    <button 
                                        className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 group shadow-lg hover:shadow-xl"
                                        onClick={auth.signIn}
                                    >
                                        <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        <span>Sign In to Continue</span>
                                    </button>
                                )}
                            </>
                        )}

                        {/* Security note */}
                        <div className="mt-4 flex items-center justify-center space-x-1 text-xs text-gray-500">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <span>Secure authentication via Puter</span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-gray-500 text-xs mt-6">
                    Transform your resume. Land your dream job.
                </p>
            </div>
        </main>
    )
}

export default Auth
