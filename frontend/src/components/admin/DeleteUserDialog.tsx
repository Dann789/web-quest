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

interface DeleteUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userName: string;
  onConfirm: () => Promise<{ success: boolean; message: string }>;
}

/**
 * DeleteUserDialog - Confirmation dialog for deleting users
 */
export default function DeleteUserDialog({ 
  open, 
  onOpenChange, 
  userName, 
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
        onOpenChange(false);
      } else {
        setError(result.message);
      }
    } catch (err) {
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
            Are you sure you want to delete <strong>{userName}</strong>? 
            This action cannot be undone. All user data including progress, 
            challenge attempts, and badges will be permanently deleted.
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
