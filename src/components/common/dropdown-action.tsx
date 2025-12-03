import { ReactNode } from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { EllipsisVertical } from 'lucide-react';

interface DropdownMenuItemType {
    label: string | ReactNode;
    variant?: 'destructive' | 'default' | 'link';
    action?: () => void;
    type?: 'item' | 'link';
}

export default function DropdownAction({
    menu = [],
}: {
    menu: DropdownMenuItemType[];
}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-muted-foreground size-8"
                    size="icon"
                >
                    <EllipsisVertical />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                {menu.map((item, index) => (
                    <DropdownMenuItem
                        key={`dropdown-action-${index}`}
                        variant={item.variant === 'destructive' ? 'destructive' : undefined}
                        asChild={item.type === 'link'}
                        onClick={item.action}
                    >
                        {item.label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}