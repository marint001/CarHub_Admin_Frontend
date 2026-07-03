import React, { useState, useEffect } from 'react';
import { 
  FaChartLine, 
  FaCar, 
  FaUsers, 
  FaDollarSign,
  FaCalendar,
  FaDownload,
  FaPrint,
  FaFilter,
  FaArrowUp,
  FaArrowDown,
  FaUserCheck,
  FaClock,
  FaFileExport,
  FaPrint as FaPrintIcon,
  FaFileCsv,
  FaFilePdf,
  FaFileExcel,
  FaCheckCircle,
  FaTimes,
  FaSearch,
  FaSlidersH
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../common/LoadingSpinner';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [period, setPeriod] = useState('month');
  const [reportData, setReportData] = useState(null);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    dateRange: 'last30',
    startDate: '',
    endDate: '',
    makes: ['All'],
    status: ['All'],
    minPrice: '',
    maxPrice: '',
    sortBy: 'sales',
    sortOrder: 'desc'
  });

  const [tempFilters, setTempFilters] = useState(filters);
  const [filteredData, setFilteredData] = useState(null);

  const makesList = ['Toyota', 'BMW', 'Mercedes', 'Audi', 'Honda', 'Ford', 'Chevrolet', 'Nissan', 'Volkswagen'];
  const statusList = ['Available', 'Sold', 'Reserved', 'All'];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const data = {
        summary: {
          totalSales: 32,
          totalRevenue: 1245000,
          totalLeads: 128,
          conversionRate: '25%',
          averagePrice: 38906,
          totalCars: 45
        },
        salesByMake: [
          { make: 'Toyota', count: 12, revenue: 390000 },
          { make: 'BMW', count: 8, revenue: 440000 },
          { make: 'Mercedes', count: 6, revenue: 413400 },
          { make: 'Audi', count: 4, revenue: 291600 },
          { make: 'Honda', count: 2, revenue: 57000 }
        ],
        monthlyTrend: [
          { month: 'Jan', sales: 12, revenue: 420000 },
          { month: 'Feb', sales: 19, revenue: 665000 },
          { month: 'Mar', sales: 3, revenue: 105000 },
          { month: 'Apr', sales: 5, revenue: 175000 },
          { month: 'May', sales: 2, revenue: 70000 },
          { month: 'Jun', sales: 3, revenue: 105000 },
          { month: 'Jul', sales: 7, revenue: 245000 },
          { month: 'Aug', sales: 8, revenue: 280000 },
          { month: 'Sep', sales: 12, revenue: 420000 },
          { month: 'Oct', sales: 15, revenue: 525000 },
          { month: 'Nov', sales: 10, revenue: 350000 },
          { month: 'Dec', sales: 14, revenue: 490000 }
        ],
        leadStatus: [
          { status: 'New', count: 45 },
          { status: 'Contacted', count: 32 },
          { status: 'Test Drive', count: 18 },
          { status: 'Negotiation', count: 12 },
          { status: 'Sold', count: 21 }
        ]
      };
      setReportData(data);
      setFilteredData(data);
      setLoading(false);
    }, 1000);
  }, [period]);

  // EXPORT FUNCTIONS - Fixed all exports

  const exportCSV = () => {
    setExportLoading(true);
    
    try {
      const dataToExport = filteredData || reportData;
      // Prepare data for CSV
      const headers = ['Make', 'Sales', 'Revenue'];
      const rows = dataToExport.salesByMake.map(item => [
        item.make,
        item.count,
        item.revenue
      ]);

      // Add summary rows
      rows.push(['---', '---', '---']);
      rows.push(['Total Sales', dataToExport.summary.totalSales, '']);
      rows.push(['Total Revenue', '', `$${dataToExport.summary.totalRevenue}`]);
      rows.push(['Conversion Rate', dataToExport.summary.conversionRate, '']);

      // Create CSV content
      let csvContent = headers.join(',') + '\n';
      rows.forEach(row => {
        csvContent += row.join(',') + '\n';
      });

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `reports_${period}_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('CSV file exported successfully! 📊');
      setShowExportOptions(false);
    } catch (error) {
      toast.error('Failed to export CSV');
    } finally {
      setExportLoading(false);
    }
  };

  const exportJSON = () => {
    setExportLoading(true);
    
    try {
      const dataToExport = filteredData || reportData;
      const jsonData = {
        reportDate: new Date().toISOString(),
        period: period,
        summary: dataToExport.summary,
        salesByMake: dataToExport.salesByMake,
        monthlyTrend: dataToExport.monthlyTrend,
        leadStatus: dataToExport.leadStatus
      };

      const jsonString = JSON.stringify(jsonData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `reports_${period}_${new Date().toISOString().split('T')[0]}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('JSON file exported successfully! 📄');
      setShowExportOptions(false);
    } catch (error) {
      toast.error('Failed to export JSON');
    } finally {
      setExportLoading(false);
    }
  };

  const exportExcel = () => {
    setExportLoading(true);
    
    try {
      const dataToExport = filteredData || reportData;
      // Create Excel-like HTML table
      const tableData = `
        <html>
          <head>
            <meta charset="UTF-8">
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #FFD700; }
              table { border-collapse: collapse; width: 100%; margin: 10px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #FFD700; color: #000; }
              .summary { background-color: #f5f5f5; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>AutoShow Report - ${new Date().toLocaleDateString()}</h1>
            <h2>Period: ${period}</h2>
            
            <h3>Summary</h3>
            <table>
              <tr>
                <th>Metric</th>
                <th>Value</th>
              </tr>
              <tr><td>Total Sales</td><td>${dataToExport.summary.totalSales}</td></tr>
              <tr><td>Total Revenue</td><td>$${dataToExport.summary.totalRevenue.toLocaleString()}</td></tr>
              <tr><td>Total Leads</td><td>${dataToExport.summary.totalLeads}</td></tr>
              <tr><td>Conversion Rate</td><td>${dataToExport.summary.conversionRate}</td></tr>
              <tr><td>Average Price</td><td>$${dataToExport.summary.averagePrice.toLocaleString()}</td></tr>
            </table>

            <h3>Sales by Make</h3>
            <table>
              <tr>
                <th>Make</th>
                <th>Sales</th>
                <th>Revenue</th>
              </tr>
              ${dataToExport.salesByMake.map(item => `
                <tr>
                  <td>${item.make}</td>
                  <td>${item.count}</td>
                  <td>$${item.revenue.toLocaleString()}</td>
                </tr>
              `).join('')}
            </table>

            <h3>Monthly Trend</h3>
            <table>
              <tr>
                <th>Month</th>
                <th>Sales</th>
                <th>Revenue</th>
              </tr>
              ${dataToExport.monthlyTrend.map(item => `
                <tr>
                  <td>${item.month}</td>
                  <td>${item.sales}</td>
                  <td>$${item.revenue.toLocaleString()}</td>
                </tr>
              `).join('')}
            </table>

            <h3>Lead Status</h3>
            <table>
              <tr>
                <th>Status</th>
                <th>Count</th>
              </tr>
              ${dataToExport.leadStatus.map(item => `
                <tr>
                  <td>${item.status}</td>
                  <td>${item.count}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `;

      const blob = new Blob([tableData], { type: 'application/vnd.ms-excel' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `reports_${period}_${new Date().toISOString().split('T')[0]}.xls`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Excel file exported successfully! 📊');
      setShowExportOptions(false);
    } catch (error) {
      toast.error('Failed to export Excel');
    } finally {
      setExportLoading(false);
    }
  };

  const exportPDF = () => {
    setExportLoading(true);
    
    try {
      const dataToExport = filteredData || reportData;
      // Create printable HTML content
      const printContent = `
        <html>
          <head>
            <meta charset="UTF-8">
            <title>AutoShow Report</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 20px; }
              h1 { color: #FFD700; }
              table { border-collapse: collapse; width: 100%; margin: 10px 0; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #FFD700; color: #000; }
              .summary-box { background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 10px 0; }
              .summary-box .stat { display: inline-block; margin: 10px 20px; }
              .stat-value { font-size: 24px; font-weight: bold; color: #FFD700; }
              .stat-label { color: #666; }
            </style>
          </head>
          <body>
            <h1>AutoShow Report</h1>
            <p>Generated: ${new Date().toLocaleString()}</p>
            <p>Period: ${period}</p>

            <div class="summary-box">
              <div class="stat">
                <div class="stat-value">${dataToExport.summary.totalSales}</div>
                <div class="stat-label">Total Sales</div>
              </div>
              <div class="stat">
                <div class="stat-value">$${(dataToExport.summary.totalRevenue / 1000).toFixed(1)}K</div>
                <div class="stat-label">Total Revenue</div>
              </div>
              <div class="stat">
                <div class="stat-value">${dataToExport.summary.totalLeads}</div>
                <div class="stat-label">Total Leads</div>
              </div>
              <div class="stat">
                <div class="stat-value">${dataToExport.summary.conversionRate}</div>
                <div class="stat-label">Conversion Rate</div>
              </div>
            </div>

            <h2>Sales by Make</h2>
            <table>
              <tr><th>Make</th><th>Sales</th><th>Revenue</th></tr>
              ${dataToExport.salesByMake.map(item => `
                <tr>
                  <td>${item.make}</td>
                  <td>${item.count}</td>
                  <td>$${item.revenue.toLocaleString()}</td>
                </tr>
              `).join('')}
            </table>

            <h2>Monthly Trend</h2>
            <table>
              <tr><th>Month</th><th>Sales</th><th>Revenue</th></tr>
              ${dataToExport.monthlyTrend.map(item => `
                <tr>
                  <td>${item.month}</td>
                  <td>${item.sales}</td>
                  <td>$${item.revenue.toLocaleString()}</td>
                </tr>
              `).join('')}
            </table>

            <h2>Lead Status</h2>
            <table>
              <tr><th>Status</th><th>Count</th></tr>
              ${dataToExport.leadStatus.map(item => `
                <tr>
                  <td>${item.status}</td>
                  <td>${item.count}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `;

      // Open print window
      const printWindow = window.open('', '_blank');
      printWindow.document.write(printContent);
      printWindow.document.close();
      
      // Wait for content to load then print
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        toast.success('PDF printed successfully! 📄');
        setShowExportOptions(false);
      }, 1000);
    } catch (error) {
      toast.error('Failed to export PDF');
    } finally {
      setExportLoading(false);
    }
  };

  // Export handler
  const handleExport = (format) => {
    switch(format) {
      case 'csv':
        exportCSV();
        break;
      case 'json':
        exportJSON();
        break;
      case 'excel':
        exportExcel();
        break;
      case 'pdf':
        exportPDF();
        break;
      default:
        toast.error('Unknown export format');
    }
  };

  // Apply filters
  const applyFilters = () => {
    setFilters(tempFilters);
    
    let filtered = { ...reportData };

    // Filter by makes
    if (!tempFilters.makes.includes('All')) {
      filtered.salesByMake = filtered.salesByMake.filter(item => 
        tempFilters.makes.includes(item.make)
      );
    }

    // Filter by status
    if (!tempFilters.status.includes('All')) {
      filtered.leadStatus = filtered.leadStatus.filter(item => 
        tempFilters.status.includes(item.status)
      );
    }

    // Sort by selected field
    const sortField = tempFilters.sortBy;
    const sortOrder = tempFilters.sortOrder === 'desc' ? -1 : 1;
    
    filtered.salesByMake = filtered.salesByMake.sort((a, b) => {
      if (sortField === 'sales') {
        return (a.count - b.count) * sortOrder;
      } else if (sortField === 'revenue') {
        return (a.revenue - b.revenue) * sortOrder;
      } else if (sortField === 'make') {
        return a.make.localeCompare(b.make) * sortOrder;
      }
      return 0;
    });

    setFilteredData(filtered);
    setShowFilterModal(false);
    toast.success('Filters applied successfully! ✅');
  };

  const resetFilters = () => {
    const defaultFilters = {
      dateRange: 'last30',
      startDate: '',
      endDate: '',
      makes: ['All'],
      status: ['All'],
      minPrice: '',
      maxPrice: '',
      sortBy: 'sales',
      sortOrder: 'desc'
    };
    setTempFilters(defaultFilters);
    setFilters(defaultFilters);
    setFilteredData(reportData);
    setShowFilterModal(false);
    toast.info('Filters reset');
  };

  const handleMakeToggle = (make) => {
    setTempFilters(prev => {
      let newMakes;
      if (make === 'All') {
        newMakes = ['All'];
      } else {
        const currentMakes = prev.makes.filter(m => m !== 'All');
        if (currentMakes.includes(make)) {
          newMakes = currentMakes.filter(m => m !== make);
        } else {
          newMakes = [...currentMakes, make];
        }
        if (newMakes.length === 0) {
          newMakes = ['All'];
        }
      }
      return { ...prev, makes: newMakes };
    });
  };

  const handleStatusToggle = (status) => {
    setTempFilters(prev => {
      let newStatus;
      if (status === 'All') {
        newStatus = ['All'];
      } else {
        const currentStatus = prev.status.filter(s => s !== 'All');
        if (currentStatus.includes(status)) {
          newStatus = currentStatus.filter(s => s !== status);
        } else {
          newStatus = [...currentStatus, status];
        }
        if (newStatus.length === 0) {
          newStatus = ['All'];
        }
      }
      return { ...prev, status: newStatus };
    });
  };

  // Check if filters are active
  const hasActiveFilters = () => {
    return (
      filters.makes.length > 0 && !filters.makes.includes('All') ||
      filters.status.length > 0 && !filters.status.includes('All') ||
      filters.minPrice ||
      filters.maxPrice ||
      filters.sortBy !== 'sales' ||
      filters.sortOrder !== 'desc'
    );
  };

  if (loading) return <LoadingSpinner />;

  const displayData = filteredData || reportData;

  return (
    <div className="reports-page animate-fade-in">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Reports</h1>
          <p className="page-subtitle">View analytics and insights about your showroom performance</p>
        </div>
        <div className="header-actions">
          <div className="btn-group">
            <button 
              className={`btn btn-secondary ${period === 'month' ? 'active' : ''}`}
              onClick={() => setPeriod('month')}
            >
              <FaCalendar /> Monthly
            </button>
            <button 
              className={`btn btn-secondary ${period === 'quarter' ? 'active' : ''}`}
              onClick={() => setPeriod('quarter')}
            >
              <FaCalendar /> Quarterly
            </button>
            <button 
              className={`btn btn-secondary ${period === 'year' ? 'active' : ''}`}
              onClick={() => setPeriod('year')}
            >
              <FaCalendar /> Yearly
            </button>
          </div>
          
          {/* Filter Button */}
          <button 
            className={`btn ${hasActiveFilters() ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setShowFilterModal(true)}
          >
            <FaFilter /> 
            Filter
            {hasActiveFilters() && (
              <span className="filter-active-dot"></span>
            )}
          </button>
          
          {/* Export Button */}
          <div className="export-dropdown">
            <button 
              className="btn btn-primary"
              onClick={() => setShowExportOptions(!showExportOptions)}
              disabled={exportLoading}
            >
              {exportLoading ? (
                <>
                  <span className="spinner-border-sm"></span>
                  Exporting...
                </>
              ) : (
                <>
                  <FaFileExport /> Export
                </>
              )}
            </button>
            
            {showExportOptions && !exportLoading && (
              <div className="export-dropdown-menu">
                <button onClick={() => handleExport('csv')}>
                  <FaFileCsv /> CSV
                </button>
                <button onClick={() => handleExport('json')}>
                  <FaFileExport /> JSON
                </button>
                <button onClick={() => handleExport('excel')}>
                  <FaFileExcel /> Excel
                </button>
                <button onClick={() => handleExport('pdf')}>
                  <FaFilePdf /> PDF (Print)
                </button>
              </div>
            )}
          </div>
          
          <button className="btn btn-secondary" onClick={exportPDF}>
            <FaPrintIcon /> Print
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters() && (
        <div className="active-filters">
          <span className="active-filters-label">
            <FaSlidersH /> Active Filters:
          </span>
          {filters.makes.length > 0 && !filters.makes.includes('All') && (
            <span className="filter-tag">
              Makes: {filters.makes.join(', ')}
            </span>
          )}
          {filters.status.length > 0 && !filters.status.includes('All') && (
            <span className="filter-tag">
              Status: {filters.status.join(', ')}
            </span>
          )}
          {filters.minPrice && (
            <span className="filter-tag">
              Min Price: ${filters.minPrice}
            </span>
          )}
          {filters.maxPrice && (
            <span className="filter-tag">
              Max Price: ${filters.maxPrice}
            </span>
          )}
          {filters.sortBy !== 'sales' && (
            <span className="filter-tag">
              Sort: {filters.sortBy} ({filters.sortOrder})
            </span>
          )}
          <button className="clear-filters-btn" onClick={resetFilters}>
            <FaTimes /> Clear all
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="reports-summary">
        <div className="report-card">
          <div className="report-icon" style={{ background: 'rgba(255, 215, 0, 0.1)', color: '#FFD700' }}>
            <FaDollarSign />
          </div>
          <div className="report-info">
            <span className="report-label">Total Revenue</span>
            <span className="report-value">${(displayData.summary.totalRevenue / 1000).toFixed(1)}K</span>
            <span className="report-change positive">
              <FaArrowUp /> +15.3%
            </span>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon" style={{ background: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' }}>
            <FaCar />
          </div>
          <div className="report-info">
            <span className="report-label">Total Sales</span>
            <span className="report-value">{displayData.summary.totalSales}</span>
            <span className="report-change positive">
              <FaArrowUp /> +8.2%
            </span>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon" style={{ background: 'rgba(66, 165, 245, 0.1)', color: '#42A5F5' }}>
            <FaUsers />
          </div>
          <div className="report-info">
            <span className="report-label">Total Leads</span>
            <span className="report-value">{displayData.summary.totalLeads}</span>
            <span className="report-change positive">
              <FaArrowUp /> +12.5%
            </span>
          </div>
        </div>

        <div className="report-card">
          <div className="report-icon" style={{ background: 'rgba(255, 167, 38, 0.1)', color: '#FFA726' }}>
            <FaUserCheck />
          </div>
          <div className="report-info">
            <span className="report-label">Conversion Rate</span>
            <span className="report-value">{displayData.summary.conversionRate}</span>
            <span className="report-change positive">
              <FaArrowUp /> +2.1%
            </span>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="reports-grid">
        {/* Sales by Make */}
        <div className="report-chart-card">
          <div className="chart-header">
            <h3>Sales by Make</h3>
            <span className="chart-total">{displayData.salesByMake.length} makes</span>
          </div>
          <div className="chart-body">
            {displayData.salesByMake.map((item, index) => {
              const maxCount = Math.max(...displayData.salesByMake.map(i => i.count));
              const percentage = (item.count / maxCount) * 100;
              return (
                <div key={index} className="chart-bar-item">
                  <div className="chart-bar-label">{item.make}</div>
                  <div className="chart-bar-track">
                    <div 
                      className="chart-bar-fill" 
                      style={{ 
                        width: `${percentage}%`,
                        background: `linear-gradient(90deg, #FFD700, #F0C000)`
                      }}
                    >
                      <span className="chart-bar-count">{item.count}</span>
                    </div>
                  </div>
                  <div className="chart-bar-revenue">${(item.revenue / 1000).toFixed(0)}K</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Lead Status */}
        <div className="report-chart-card">
          <div className="chart-header">
            <h3>Lead Status Distribution</h3>
            <span className="chart-total">{displayData.summary.totalLeads} total</span>
          </div>
          <div className="chart-body">
            {displayData.leadStatus.map((item, index) => {
              const colors = {
                'New': '#42A5F5',
                'Contacted': '#FFA726',
                'Test Drive': '#AB47BC',
                'Negotiation': '#FF6B6B',
                'Sold': '#4CAF50'
              };
              return (
                <div key={index} className="status-item">
                  <div className="status-dot" style={{ background: colors[item.status] }}></div>
                  <span className="status-label">{item.status}</span>
                  <span className="status-count">{item.count}</span>
                  <div className="status-bar">
                    <div 
                      className="status-bar-fill"
                      style={{ 
                        width: `${(item.count / displayData.summary.totalLeads) * 100}%`,
                        background: colors[item.status]
                      }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Monthly Trend */}
        <div className="report-chart-card full-width">
          <div className="chart-header">
            <h3>Monthly Sales Trend</h3>
            <div className="chart-controls">
              <button 
                className={`chart-btn ${period === 'month' ? 'active' : ''}`} 
                onClick={() => setPeriod('month')}
              >
                Monthly
              </button>
              <button 
                className={`chart-btn ${period === 'quarter' ? 'active' : ''}`} 
                onClick={() => setPeriod('quarter')}
              >
                Quarterly
              </button>
              <button 
                className={`chart-btn ${period === 'year' ? 'active' : ''}`} 
                onClick={() => setPeriod('year')}
              >
                Yearly
              </button>
            </div>
          </div>
          <div className="chart-body">
            <div className="trend-chart">
              {displayData.monthlyTrend.map((item, index) => {
                const maxRevenue = Math.max(...displayData.monthlyTrend.map(i => i.revenue));
                const height = (item.revenue / maxRevenue) * 150;
                return (
                  <div key={index} className="trend-bar-wrapper">
                    <div 
                      className="trend-bar"
                      style={{ 
                        height: `${Math.max(height, 10)}px`,
                        background: `linear-gradient(180deg, #FFD700, ${index % 2 === 0 ? '#F0C000' : '#FFD700'})`
                      }}
                    >
                      <span className="trend-value">${(item.revenue / 1000).toFixed(0)}K</span>
                    </div>
                    <span className="trend-label">{item.month}</span>
                    <span className="trend-sales">{item.sales} sales</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Quick Insights */}
        <div className="report-chart-card full-width">
          <div className="chart-header">
            <h3>Quick Insights</h3>
            <span className="chart-total">Last 30 days</span>
          </div>
          <div className="chart-body">
            <div className="insights-grid">
              <div className="insight-item">
                <div className="insight-icon" style={{ background: 'rgba(255, 215, 0, 0.1)', color: '#FFD700' }}>
                  <FaCar />
                </div>
                <div className="insight-info">
                  <span className="insight-label">Avg. Selling Price</span>
                  <span className="insight-value">${(displayData.summary.averagePrice).toLocaleString()}</span>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon" style={{ background: 'rgba(76, 175, 80, 0.1)', color: '#4CAF50' }}>
                  <FaClock />
                </div>
                <div className="insight-info">
                  <span className="insight-label">Avg. Days to Sell</span>
                  <span className="insight-value">18 days</span>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon" style={{ background: 'rgba(66, 165, 245, 0.1)', color: '#42A5F5' }}>
                  <FaUsers />
                </div>
                <div className="insight-info">
                  <span className="insight-label">Active Leads</span>
                  <span className="insight-value">
                    {displayData.summary.totalLeads - displayData.leadStatus.find(s => s.status === 'Sold')?.count || 0}
                  </span>
                </div>
              </div>
              <div className="insight-item">
                <div className="insight-icon" style={{ background: 'rgba(255, 167, 38, 0.1)', color: '#FFA726' }}>
                  <FaDollarSign />
                </div>
                <div className="insight-info">
                  <span className="insight-label">Revenue per Car</span>
                  <span className="insight-value">${(displayData.summary.totalRevenue / displayData.summary.totalSales).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="filter-modal-overlay" onClick={() => setShowFilterModal(false)}>
          <div className="filter-modal" onClick={(e) => e.stopPropagation()}>
            <div className="filter-modal-header">
              <h3>
                <FaSlidersH /> Filter Reports
              </h3>
              <button className="filter-modal-close" onClick={() => setShowFilterModal(false)}>
                <FaTimes />
              </button>
            </div>

            <div className="filter-modal-body">
              {/* Date Range */}
              <div className="filter-section">
                <h4>Date Range</h4>
                <select 
                  value={tempFilters.dateRange}
                  onChange={(e) => setTempFilters({ ...tempFilters, dateRange: e.target.value })}
                  className="filter-select"
                >
                  <option value="last7">Last 7 days</option>
                  <option value="last30">Last 30 days</option>
                  <option value="last90">Last 90 days</option>
                  <option value="lastYear">Last Year</option>
                  <option value="custom">Custom Range</option>
                </select>
                {tempFilters.dateRange === 'custom' && (
                  <div className="filter-date-range">
                    <input 
                      type="date" 
                      value={tempFilters.startDate}
                      onChange={(e) => setTempFilters({ ...tempFilters, startDate: e.target.value })}
                      className="filter-input"
                    />
                    <span>to</span>
                    <input 
                      type="date" 
                      value={tempFilters.endDate}
                      onChange={(e) => setTempFilters({ ...tempFilters, endDate: e.target.value })}
                      className="filter-input"
                    />
                  </div>
                )}
              </div>

              {/* Make Filter */}
              <div className="filter-section">
                <h4>Make</h4>
                <div className="filter-checkbox-group">
                  <label className="filter-checkbox">
                    <input 
                      type="checkbox" 
                      checked={tempFilters.makes.includes('All')}
                      onChange={() => handleMakeToggle('All')}
                    />
                    <span>All Makes</span>
                  </label>
                  {makesList.map(make => (
                    <label key={make} className="filter-checkbox">
                      <input 
                        type="checkbox" 
                        checked={tempFilters.makes.includes(make)}
                        onChange={() => handleMakeToggle(make)}
                        disabled={tempFilters.makes.includes('All')}
                      />
                      <span>{make}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Status Filter */}
              <div className="filter-section">
                <h4>Status</h4>
                <div className="filter-checkbox-group">
                  {statusList.map(status => (
                    <label key={status} className="filter-checkbox">
                      <input 
                        type="checkbox" 
                        checked={tempFilters.status.includes(status)}
                        onChange={() => handleStatusToggle(status)}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="filter-section">
                <h4>Price Range</h4>
                <div className="filter-price-range">
                  <input 
                    type="number" 
                    placeholder="Min Price"
                    value={tempFilters.minPrice}
                    onChange={(e) => setTempFilters({ ...tempFilters, minPrice: e.target.value })}
                    className="filter-input"
                  />
                  <span>to</span>
                  <input 
                    type="number" 
                    placeholder="Max Price"
                    value={tempFilters.maxPrice}
                    onChange={(e) => setTempFilters({ ...tempFilters, maxPrice: e.target.value })}
                    className="filter-input"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="filter-section">
                <h4>Sort By</h4>
                <div className="filter-sort">
                  <select 
                    value={tempFilters.sortBy}
                    onChange={(e) => setTempFilters({ ...tempFilters, sortBy: e.target.value })}
                    className="filter-select"
                  >
                    <option value="sales">Sales</option>
                    <option value="revenue">Revenue</option>
                    <option value="make">Make (A-Z)</option>
                  </select>
                  <select 
                    value={tempFilters.sortOrder}
                    onChange={(e) => setTempFilters({ ...tempFilters, sortOrder: e.target.value })}
                    className="filter-select"
                  >
                    <option value="desc">Highest First</option>
                    <option value="asc">Lowest First</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="filter-modal-footer">
              <button className="btn btn-secondary" onClick={resetFilters}>
                Reset Filters
              </button>
              <button className="btn btn-primary" onClick={applyFilters}>
                <FaCheckCircle /> Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;