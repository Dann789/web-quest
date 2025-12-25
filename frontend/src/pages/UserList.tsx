import { useEffect, useState } from "react";
import { fetchUsers, deleteUser } from "../services/api";
import { Link } from "react-router-dom";
import { Edit2, Trash2, Plus, Search } from "lucide-react";

interface User {
    id: number;
    name: string;
    email: string;
}

export default function UserList() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    const loadUsers = async () => {
        try {
            const res = await fetchUsers();
            if (res.success && res.data) {
                setUsers(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch users", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadUsers();
    }, []);

    const handleDelete = async (id: number) => {
        if (confirm("Are you sure you want to delete this user?")) {
            await deleteUser(id.toString());
            loadUsers();
        }
    };

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-slate-900">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 pt-20 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
                        <p className="text-slate-400">Manage your application's users efficiently.</p>
                    </div>
                    <Link
                        to="/users/new"
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-500/20"
                    >
                        <Plus size={20} />
                        <span>Add User</span>
                    </Link>
                </div>

                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl border border-slate-700 overflow-hidden shadow-xl">
                    {/* Search Bar */}
                    <div className="p-4 border-b border-slate-700">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
                                className="w-full pl-10 pr-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                                    <th className="px-6 py-4 font-semibold">ID</th>
                                    <th className="px-6 py-4 font-semibold">Name</th>
                                    <th className="px-6 py-4 font-semibold">Email</th>
                                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700">
                                {filteredUsers.length > 0 ? (
                                    filteredUsers.map((user) => (
                                        <tr key={user.id} className="hover:bg-slate-700/50 transition-colors group">
                                            <td className="px-6 py-4 text-slate-400">#{user.id}</td>
                                            <td className="px-6 py-4">
                                                <div className="text-white font-medium">{user.name}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-300">{user.email}</td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <Link
                                                        to={`/users/edit/${user.id}`}
                                                        className="p-2 bg-slate-700 hover:bg-blue-600 text-slate-300 hover:text-white rounded-lg transition-colors"
                                                        title="Edit"
                                                    >
                                                        <Edit2 size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDelete(user.id)}
                                                        className="p-2 bg-slate-700 hover:bg-red-600 text-slate-300 hover:text-white rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                            <div className="flex flex-col items-center gap-2">
                                                <Search size={40} className="text-slate-600" />
                                                <p>No users found matching your search.</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    <div className="p-4 border-t border-slate-700 bg-slate-800/30 text-slate-400 text-sm flex justify-between items-center">
                        <span>Showing {filteredUsers.length} users</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
