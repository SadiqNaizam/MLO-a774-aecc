import React from 'react';
import MainAppLayout from '@/components/layout/MainAppLayout';
import StatCardGrid from '@/components/Dashboard/StatCardGrid';
import ChartCard from '@/components/Dashboard/ChartCard';
import DataGrid from '@/components/Dashboard/DataGrid';

/**
 * LeadsTrackingPage
 * 
 * This page represents the "Dashboard - Leads Tracking" view.
 * It utilizes the MainAppLayout to provide the overall page structure (sidebar, header)
 * and renders the core dashboard components: StatCardGrid, ChartCard, and DataGrid
 * in the main content area.
 * 
 * The title "Dashboard" is passed to the MainAppLayout, which in turn sets it in the TopHeader.
 * The individual dashboard components (StatCardGrid, ChartCard, DataGrid) are responsible
 * for their own data fetching/management and internal layout as per their definitions.
 */
const LeadsTrackingPage: React.FC = () => {
  return (
    <MainAppLayout title="Dashboard">
      {/* 
        The MainAppLayout's structure inherently places these components
        within a 'main' element that has padding, and an inner div
        with 'flex flex-col gap-6' for vertical stacking and spacing.
      */}
      <StatCardGrid />
      <ChartCard />
      <DataGrid />
    </MainAppLayout>
  );
};

export default LeadsTrackingPage;
