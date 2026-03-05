import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { 
  Users, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Pencil, 
  Trash2,
  Loader2,
} from 'lucide-react';
import UserDialog, { type UserFormData } from '@/components/admin/UserDialog';
import DeleteUserDialog from '@/components/admin/DeleteUserDialog';
import { getUsers, createUser, updateUser, deleteUser } from '@/services/UserService';
import type { User } from '@/types';

/**
 * AdminUsersPage - CRUD Management untuk Users
 * 
 * Features:
 * - List semua users dengan pagination
 * - Search/filter users
 * - Create new user
 * - Edit existing user
 * - Delete user dengan konfirmasi
 */
export default function AdminUsersPage() {
  // State untuk data
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // State untuk search
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'ALL' | 'MAHASISWA' | 'DOSEN'>('ALL');

  // State untuk dialogs
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Fetch users from API
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    setError('');

    const result = await getUsers();

    if (result.success && result.data) {
      setUsers(result.data);
      setFilteredUsers(result.data);
    } else {
      setError(result.message || 'Failed to fetch users');
    }

    setIsLoading(false);
  }, []);

  // Initial fetch
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // Filter users when search query or role filter changes
  useEffect(() => {
    let result = users;

    // Filter by role
    if (roleFilter !== 'ALL') {
      result = result.filter((user) => user.role === roleFilter);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (user) =>
          user.name?.toLowerCase().includes(query) ||
          user.username?.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
      );
    }

    setFilteredUsers(result);
  }, [searchQuery, roleFilter, users]);

  // Handle create user
  const handleCreate = async (data: UserFormData) => {
    const result = await createUser({
      username: data.username,
      email: data.email,
      name: data.name,
      password: data.password!,
      role: data.role,
    });

    if (result.success) {
      await fetchUsers(); // Refresh list
    }

    return result;
  };

  // Handle edit user
  const handleEdit = async (data: UserFormData) => {
    if (!selectedUser) return { success: false, message: 'No user selected' };

    const updateData: Partial<UserFormData> = {
      username: data.username,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    // Only include password if provided
    if (data.password) {
      updateData.password = data.password;
    }

    const result = await updateUser(selectedUser.id, updateData);

    if (result.success) {
      await fetchUsers(); // Refresh list
    }

    return result;
  };

  // Handle delete user
  const handleDelete = async () => {
    if (!selectedUser) return { success: false, message: 'No user selected' };

    const result = await deleteUser(selectedUser.id);

    if (result.success) {
      await fetchUsers(); // Refresh list
    }

    return result;
  };

  // Open edit dialog
  const openEditDialog = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  // Open delete dialog
  const openDeleteDialog = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Users className="h-8 w-8" />
            Manajemen User
          </h1>
          <p className="text-muted-foreground mt-3">
            Kelola data pengguna sistem
          </p>
        </div>
        <Button onClick={() => setIsCreateDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Tambah User
        </Button>
      </div>
      {/* Table Card */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>List User</CardTitle>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Role Filter Tabs */}
              <div className="flex items-center rounded-lg border border-border overflow-hidden">
                {(['ALL', 'MAHASISWA', 'DOSEN'] as const).map((role) => (
                  <button
                    key={role}
                    onClick={() => setRoleFilter(role)}
                    className={`px-3 py-1.5 text-sm font-medium transition-colors ${
                      roleFilter === role
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted text-muted-foreground'
                    }`}
                  >
                    {role === 'ALL' ? 'Semua' : role === 'MAHASISWA' ? 'Mahasiswa' : 'Dosen'}
                  </button>
                ))}
              </div>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari nama, NIM, email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 w-64"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Error State */}
          {error && (
            <div className="p-4 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive mb-4">
              {error}
            </div>
          )}

          {/* Loading State */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredUsers.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12 text-muted-foreground">
              {searchQuery ? 'No users found matching your search.' : 'No users yet.'}
            </div>
          ) : (
            /* Table */
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>No</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>NIM/NIP</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Ditambahkan</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user, index) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          user.role === 'DOSEN'
                            ? 'bg-blue-500/15 text-blue-400'
                            : 'bg-purple-500/15 text-purple-400'
                        }`}>
                          {user.role === 'DOSEN' ? 'Dosen' : 'Mahasiswa'}
                        </span>
                      </TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {formatDate(user.createdAt)}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(user)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => openDeleteDialog(user)}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Hapus
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {/* Results count */}
          {!isLoading && filteredUsers.length > 0 && (
            <p className="text-sm text-muted-foreground mt-4">
              Showing {filteredUsers.length} of {users.length} users
            </p>
          )}
        </CardContent>
      </Card>

      {/* Create User Dialog */}
      <UserDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        user={null}
        onSubmit={handleCreate}
      />

      {/* Edit User Dialog */}
      <UserDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        user={selectedUser}
        onSubmit={handleEdit}
      />

      {/* Delete User Dialog */}
      <DeleteUserDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        userName={selectedUser?.username || ''}
        onConfirm={handleDelete}
      />
    </div>
  );
}
