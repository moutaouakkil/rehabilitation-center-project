import { Chart } from 'chart.js';
import { AppointmentStats, ServiceStats } from '../dashboard/types';

export const generatePDF = async (
  appointmentStats: AppointmentStats,
  serviceStats: ServiceStats,
  barChartRef: React.RefObject<Chart<"bar">>,
  doughnutChartRef: React.RefObject<Chart<"doughnut">>
) => {
  try {
    const jsPDF = (await import('jspdf')).default;
    
    if (!appointmentStats?.data || !serviceStats?.data) {
      throw new Error('Invalid stats data provided');
    }

    // Initialize PDF
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.width;
    const margin = 20;
    const availableWidth = pageWidth - (2 * margin);
    let yOffset = 20;

    // Add title
    doc.setFontSize(20);
    doc.text('Rehabilitation Progress Report', pageWidth / 2, yOffset, { align: 'center' });
    yOffset += 20;

    // Add date
    doc.setFontSize(12);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, margin, yOffset);
    yOffset += 20;

    // Add summary statistics
    doc.setFontSize(14);
    doc.text('Summary Statistics', margin, yOffset);
    yOffset += 10;

    // Add appointments data
    const totalAppointments = appointmentStats.data.reduce((sum: number, count: number) => sum + count, 0);
    
    if (totalAppointments === 0) {
      doc.text('No appointments data available.', margin + 10, yOffset);
      yOffset += 10;
    } else {
      doc.setFontSize(12);
      doc.text(`Total Appointments: ${totalAppointments}`, margin + 10, yOffset);
    }
    yOffset += 15;

    // Add Monthly Appointments chart
    if (barChartRef.current) {
      try {
        doc.setFontSize(14);
        doc.text('Monthly Appointments', margin, yOffset);
        yOffset += 10;

        const barChartUrl = barChartRef.current.toBase64Image('image/png', 1.0);
        if (!barChartUrl) throw new Error('Failed to generate bar chart image');
        doc.addImage(barChartUrl, 'PNG', margin, yOffset, availableWidth, 80);
        yOffset += 90;
      } catch (chartError) {
        console.error('Error adding bar chart:', chartError);
        doc.text('Error: Could not generate monthly appointments chart', margin, yOffset);
        yOffset += 20;
      }
    }

    // New page if needed
    if (yOffset > doc.internal.pageSize.height - 140) {
      doc.addPage();
      yOffset = margin;
    }

    // Add Service Distribution chart
    if (doughnutChartRef.current) {
      try {
        const chart = doughnutChartRef.current;
        
        // Save current chart state
        const originalWidth = chart.width;
        const originalHeight = chart.height;
        
        // Save original plugin state
        let originalLegendDisplay = false;
        if (chart.options.plugins?.legend?.display !== undefined) {
          originalLegendDisplay = chart.options.plugins.legend.display;
        }

        // Configure for high quality export
        chart.resize(2000, 2000);
        
        // Temporarily modify chart options
        if (!chart.options.plugins) chart.options.plugins = {};
        if (!chart.options.plugins.legend) chart.options.plugins.legend = {};
        chart.options.plugins.legend.display = false;
        
        // Update without animations
        const originalAnimation = chart.options.animation;
        chart.options.animation = false;
        chart.update('none');

        // Generate and add chart image
        const chartUrl = chart.toBase64Image('image/png', 1.0);
        if (!chartUrl) throw new Error('Failed to generate doughnut chart image');
        
        // Add chart title
        doc.setFontSize(14);
        doc.text('Service Distribution', pageWidth / 2, yOffset, { align: 'center' });
        yOffset += 10;

        const chartSize = Math.min(availableWidth * 0.8, 160);
        const chartX = (pageWidth - chartSize) / 2;
        doc.addImage(chartUrl, 'PNG', chartX, yOffset, chartSize, chartSize);

        // Restore chart state
        chart.resize(originalWidth, originalHeight);
        chart.options.animation = originalAnimation;
        if (chart.options.plugins?.legend) {
          chart.options.plugins.legend.display = originalLegendDisplay;
        }
        chart.update('none');

        // Add custom legend
        yOffset += chartSize + 15;
        doc.setFontSize(10);
        
        const colors = ['#4ade80', '#fb7185', '#60a5fa', '#fbbf24'];
        const legendX = pageWidth / 2 - 60;
        
        serviceStats.labels.forEach((label: string, index: number) => {
          const percentage = Math.round((serviceStats.data[index] / totalAppointments) * 100);
          const yPos = yOffset + (index * 12);
          
          doc.setFillColor(colors[index]);
          doc.rect(legendX, yPos - 3, 8, 8, 'F');
          
          doc.setTextColor(0);
          doc.text(`${label}: ${percentage}%`, legendX + 12, yPos + 2);
        });

        yOffset += serviceStats.labels.length * 12 + 10;
      } catch (chartError) {
        console.error('Error adding doughnut chart:', chartError);
        doc.text('Error: Could not generate service distribution chart', margin, yOffset);
        yOffset += 20;
      }
    }

    // Add footer
    doc.setFontSize(8);
    doc.text(
      `Generated on ${new Date().toLocaleString()}`,
      pageWidth / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );

    // Save PDF
    const timestamp = new Date().toISOString().split('T')[0];
    doc.save(`rehabilitation-report-${timestamp}.pdf`);

  } catch (error) {
    console.error('Error generating PDF:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(`Failed to generate PDF: ${errorMessage}`);
  }
};
