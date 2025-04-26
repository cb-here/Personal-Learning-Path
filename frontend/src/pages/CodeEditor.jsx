import React from 'react'
import Editor from '@monaco-editor/react'
import { useState } from 'react'
import { Info, Save, Play, Folder } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'
import { runCode } from '../../services/api'
import { ClimbingBoxLoader } from 'react-spinners'
import { NavLink, } from 'react-router-dom'
import { toast } from 'react-toastify'

function CodeEditor() {
    const [code, setCode] = useState("")
    const [title, setTitle] = useState("")
    const [language, setLanguage] = useState("python")
    const languages = [
        'javascript',
        'python',
        'c++',
        'c',
        'java',
    ]
    const { mutate, isPending, isError, data } = useMutation({
        mutationFn: runCode,
        onSuccess: () => {
            toast.success("Code Run Succussfully")
        },
        onError: (error) => {
            toast.error("Failed to run the code")
        }
    })
    
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="sticky top-0 z-10 bg-white shadow-sm">
                
            </div>

            <div className='grid grid-cols-1 px-0 md:grid-cols-3 gap-0'>
                <div className='md:col-span-2 bg-white p-4 shadow-md'>
                    <div className='flex items-center justify-between py-3'>
                        <div className="flex items-center gap-4">
                            <select 
                                name="language" 
                                value={language} 
                                onChange={(e) => setLanguage(e.target.value)}
                                className="px-4 py-2 rounded-md border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                {
                                    languages?.map((lang) => (
                                        <option key={lang} value={lang}>{lang.toUpperCase()}</option>
                                    ))
                                }
                            </select>
                            <div className="relative group inline-flex z-10">
                            <Info size={20} className="text-gray-500 cursor-pointer" />
                            <div className="absolute hidden group-hover:inline-block bg-gray-700 p-10 rounded-2xl text-white">
                                <p>Make sure you have all the python, node or related compiler in your pc</p>
                            </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => mutate({ language, code })}
                                disabled={isPending}
                                className={`flex items-center gap-2 px-4 py-2 rounded-md ${isPending ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white transition`}
                            >
                                <Play size={18} />
                                {isPending ? 'Running...' : 'Run'}
                            </button>
                            
                        </div>
                    </div>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <Editor
                            height="calc(100vh - 180px)"
                            language={language}
                            theme='vs-light'
                            value={code}
                            onChange={(value) => setCode(value)}
                            options={{
                                minimap: {
                                    enabled: false
                                },
                                fontSize: 14,
                                wordWrap: 'on',
                                automaticLayout: true,
                            }}
                        />
                    </div>
                </div>
                <div className='md:col-span-1 bg-gray-50 p-4 h-[calc(100vh-64px)] overflow-auto'>
                    <div className='bg-white rounded-lg shadow-sm p-4 h-full flex flex-col'>
                        <h1 className='font-bold text-xl text-gray-800 mb-4'>Output</h1>
                        <div className="bg-gray-100 p-4 rounded-md flex-grow">
                            {isError && (
                                <p className="text-red-600 font-medium">Error Running Code</p>
                            )}
                            {isPending ? (
                                <div className="flex justify-center items-center h-full">
                                    <ClimbingBoxLoader color="#3b82f6" size={15} />
                                </div>
                            ) : (
                                data && (
                                    <pre className="whitespace-pre-wrap bg-gray-900 text-green-400 p-3 rounded-md overflow-auto font-mono text-sm h-full">
                                        {data}
                                    </pre>
                                )
                            )}
                            {!data && !isPending && !isError && (
                                <div className="flex justify-center items-center h-full">
                                    <p className="text-gray-500 italic">Your output will appear here...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CodeEditor