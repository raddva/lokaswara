import { ReactNode } from 'react';

type AuthLayoutProps = {
    children: ReactNode;
};

export default function InformationLayout({ children }: AuthLayoutProps) {
    return (
        <div>
            <div>{children}</div>
        </div>
    );
}