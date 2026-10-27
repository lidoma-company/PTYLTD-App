import ClientDashboardWrapper from './_components/ClientDashboardWrapper';

export const metadata = {
    robots: {
        index: false,
        follow: false,
    },
    title: 'Proactive Equities',
};

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return <ClientDashboardWrapper>{children}</ClientDashboardWrapper>;
};

export default DashboardLayout;
