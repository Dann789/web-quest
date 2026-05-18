import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  onConfirm: () => Promise<{ success: boolean; message: string }>;
}

/**
 * DeleteUserDialog - Confirmation dialog for deleting users
 */
export default function DeleteUserDialog({ 
  open, 
  onOpenChange, 
  name, 
  onConfirm 
}: DeleteUserDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConfirm = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await onConfirm();
      
      if (result.success) {
        toast.success(`Data user ${name} berhasil dihapus`);
        onOpenChange(false);
      } else {
        toast.error(`Gagal menghapus user: ${result.message}`);
        setError(result.message);
      }
    } catch (err) {
      toast.error('Terjadi Kesalahan');
      setError('Failed to delete user');
      console.error('Delete error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete User</AlertDialogTitle>
          <AlertDialogDescription>
            Apakah anda yakin ingin menghapus user <strong>{name}</strong>? 
            Tindakan ini tidak dapat dibatalkan. Semua data user termasuk progres, 
            percobaan challenge, dan badge akan dihapus secara permanen.
          </AlertDialogDescription>
        </AlertDialogHeader>

        {error && (
          <div className="p-3 rounded-lg bg-destructive/20 border border-destructive/30 text-destructive text-sm">
            {error}
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              handleConfirm();
            }}
            disabled={isLoading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              'Delete User'
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
