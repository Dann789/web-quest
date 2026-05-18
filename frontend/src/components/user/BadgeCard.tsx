import { Badge } from '@/components/ui/badge';
import type { BadgeItem } from '@/types';

interface BadgeCardProps {
    badge: BadgeItem & { isEarned: boolean; earnedAt: string | null };
}

const getRarityStyles = (rarity: string) => {
    switch (rarity) {
        case 'COMMON':
            return {
                iconBg: 'bg-slate-100 dark:bg-slate-800',
                iconColor: 'text-slate-600 dark:text-slate-400',
                border: 'border-slate-200 dark:border-slate-700',
                badge: 'bg-slate-100 text-slate-600 border-slate-200'
            };
        case 'RARE':
            return {
                iconBg: 'bg-blue-100 dark:bg-blue-900/30',
                iconColor: 'text-blue-600 dark:text-blue-400',
                border: 'border-blue-200 dark:border-blue-800',
                badge: 'bg-blue-100 text-blue-600 border-blue-200'
            };
        case 'EPIC':
            return {
                iconBg: 'bg-purple-100 dark:bg-purple-900/30',
                iconColor: 'text-purple-600 dark:text-purple-400',
                border: 'border-purple-200 dark:border-purple-800',
                badge: 'bg-purple-100 text-purple-600 border-purple-200'
            };
        case 'LEGENDARY':
            return {
                iconBg: 'bg-amber-100 dark:bg-amber-900/30',
                iconColor: 'text-amber-600 dark:text-amber-400',
                border: 'border-amber-200 dark:border-amber-800',
                badge: 'bg-amber-100 text-amber-600 border-amber-200'
            };
        default:
            return {
                iconBg: 'bg-slate-100',
                iconColor: 'text-slate-600',
                border: 'border-slate-200',
                badge: 'bg-slate-100'
            };
    }
};

export function BadgeCard({ badge }: BadgeCardProps) {
    const styles = getRarityStyles(badge.rarity);
    return (
        <div
            key={badge.id}
            className={`group relative flex flex-col items-center p-5 rounded-xl border transition-all duration-300 ${badge.isEarned
                    ? `bg-card ${styles.border} scale-100 hover:scale-105`
                    : 'bg-muted/40 border-dashed border-muted opacity-70 grayscale scale-100 hover:grayscale-0 hover:scale-105 hover:opacity-100'
                }`}
        >
            <div className="absolute top-3 right-3">
                <Badge variant="outline" className={`text-[10px] px-2 py-0 border-0 ${styles.badge}`}>
                    {badge.rarity}
                </Badge>
            </div>

            <img src={badge.iconPath} alt={badge.name} className="h-max w-max" />

            <div className="text-center space-y-1 w-full">
                <p className={`font-semibold truncate ${!badge.isEarned && 'text-muted-foreground'}`}>
                    {badge.name}
                </p>
                <p className="text-xs text-muted-foreground line-clamp-2 min-h-[2.5em]">
                    {badge.description}
                </p>
                {/* {badge.isEarned && badge.earnedAt && (
                    <div className="text-[10px] text-emerald-500 font-medium pt-1">
                        Didapat pada {new Date(badge.earnedAt).toLocaleDateString('id-ID')}
                    </div>
                )} */}
            </div>
        </div>
    );
}