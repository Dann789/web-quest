import React, { useEffect, useState } from "react";
import { createUser, fetchUserById, updateUser } from "../services/api";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Save, Loader2, User, Mail, Lock } from "lucide-react";

export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (isEditing && id) {
            setFetching(true);
            fetchUserById(id)
                .then((res) => {
                    if (res.success && res.data) {
                        setFormData({
                            name: res.data.name || "",
                            email: res.data.email || "",
                            password: "", // Don't fill password on edit for security
                        });
                    } else {
                        setError("User not found");
                    }
                })
                .catch(() => setError("Failed to fetch user details"))
                .finally(() => setFetching(false));
        }
    }, [id, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let res;
            if (isEditing && id) {
                // Only send password if it's not empty
                const updateData = { ...formData };
                if (!updateData.password) {
                    delete (updateData as any).password;
                }
                res = await updateUser(id, updateData);
            } else {
                res = await createUser(formData);
            }

            if (res.success) {
                navigate("/users");
            } else {
                // Handle validation errors from backend if returned in specific format, or generic message
                if (res && res.error && res.error.issues) {
                    setError(res.error.issues.map((i: any) => i.message).join(", "));
                } else {
                    setError(res.message || "Operation failed");
                }
            }
        } catch (err) {
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-900 text-white">
                <Loader2 className="animate-spin mr-2" /> Loading user details...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-20 px-4 sm:px-6 lg:px-8 flex justify-center items-start">
            <div className="w-full max-w-lg">
                <Link to="/users" className="inline-flex items-center text-slate-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft size={20} className="mr-2" />
                    Back to Users
                </Link>

                <div className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 shadow-2xl">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-white mb-2">
                            {isEditing ? "Edit User" : "Create New User"}
                        </h1>
                        <p className="text-slate-400">
                            {isEditing ? "Update user information below." : "Fill in the details to create a new account."}
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-200 text-sm">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 block">Full Name</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <User size={18} />
                                </div>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 block">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <Mail size={18} />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 block">
                                {isEditing ? "New Password (Leave blank to keep current)" : "Password"}
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type="password"
                                    required={!isEditing}
                                    minLength={3}
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="block w-full pl-10 pr-3 py-2.5 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                    placeholder={isEditing ? "••••••••" : "Choose a secure password"}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={20} className="animate-spin mr-2" /> Processing...
                                </>
                            ) : (
                                <>
                                    <Save size={20} className="mr-2" /> {isEditing ? "Update User" : "Create User"}
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
