import React from 'react';
import { BusinessCaseData, BenefitCalculation, formatCurrency } from '../lib/data';

// Use global html2pdf from CDN
declare const html2pdf: any;

interface PDFExportProps {
  data: BusinessCaseData;
  benefits: BenefitCalculation;
  showCorporateView: boolean;
}

const PDFExport: React.FC<PDFExportProps> = ({ data, benefits, showCorporateView }) => {
  const handleExport = () => {
    // Create the export container
    const element = document.createElement('div');
    element.style.width = '7.5in';
    element.style.padding = '0.5in';
    
    // Add custom styles for PDF
    element.innerHTML = `
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        
        body {
          font-family: 'Inter', sans-serif;
          color: #333;
          line-height: 1.6;
          max-width: 100%;
          overflow-x: hidden;
          counter-reset: page;
        }
        
        .page-break {
          page-break-before: always;
          break-before: page;
        }

        .avoid-break {
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        .header {
          background: linear-gradient(135deg, #38003C 0%, #4A0050 100%);
          color: white;
          padding: 20px;
          margin: -0.5in -0.5in 20px -0.5in;
          position: relative;
          overflow: hidden;
          page-break-after: avoid;
          break-after: avoid;
        }
        
        .header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 150%, rgba(255, 173, 222, 0.15) 20%, transparent 70%),
            radial-gradient(circle at 80% -50%, rgba(4, 223, 198, 0.15) 20%, transparent 70%),
            radial-gradient(circle at 50% 50%, rgba(122, 57, 237, 0.1) 30%, transparent 80%);
        }

        .header-content {
          max-width: 6.5in;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo-container {
          width: 100px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
        }

        .faye-logo {
          height: 30px;
          width: auto;
        }

        .tjc-logo {
          height: 45px;
          width: auto;
          filter: brightness(0) invert(1); /* Make the logo white */
        }

        .header-text {
          text-align: center;
          flex-grow: 1;
          padding: 0 15px;
        }

        .header h1 {
          font-size: 24px;
          font-weight: bold;
          margin: 0 0 8px 0;
        }
        
        .header h2 {
          font-size: 18px;
          margin: 0 0 4px 0;
          opacity: 0.9;
        }

        .header p {
          font-size: 14px;
          margin: 0;
          opacity: 0.8;
        }

        .section {
          max-width: 6.5in;
          margin: 0 auto 20px auto;
          background: white;
          border-radius: 6px;
          padding: 15px;
          page-break-inside: avoid;
          break-inside: avoid;
        }
        
        .section-title {
          color: #38003C;
          font-size: 20px;
          font-weight: bold;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #16815A;
        }

        .metric-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .metric-card {
          background: #f8f9fa;
          border-radius: 6px;
          padding: 15px;
        }

        .metric-value {
          font-size: 24px;
          font-weight: bold;
          color: #38003C;
          margin-bottom: 4px;
        }

        .metric-label {
          font-size: 13px;
          color: #666;
        }

        .stakeholder-section {
          margin-bottom: 20px;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .stakeholder-title {
          font-size: 18px;
          font-weight: bold;
          color: #38003C;
          margin-bottom: 10px;
          padding-left: 12px;
          border-left: 4px solid #16815A;
        }

        .stakeholder-content {
          background: #f8f9fa;
          border-radius: 6px;
          padding: 15px;
          margin-bottom: 15px;
          page-break-inside: avoid;
          break-inside: avoid;
        }

        .research-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .research-item {
          background: #f8f9fa;
          border-radius: 6px;
          padding: 15px;
          border-left: 4px solid #38003C;
        }

        .research-title {
          font-weight: bold;
          margin-bottom: 8px;
        }

        .research-stat {
          font-size: 20px;
          font-weight: bold;
          color: #16815A;
          margin-bottom: 8px;
        }

        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 13px;
        }

        th, td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #eee;
        }

        th {
          background: #38003C;
          color: white;
          font-weight: 600;
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .benefit-item {
          background: #f8f9fa;
          border-radius: 6px;
          padding: 15px;
        }

        .benefit-header {
          display: flex;
          align-items: center;
          margin-bottom: 10px;
        }

        .benefit-title {
          font-weight: bold;
          color: #38003C;
        }

        .benefit-value {
          font-size: 24px;
          font-weight: bold;
          color: #16815A;
          margin-bottom: 8px;
        }

        .benefit-description {
          font-size: 13px;
          color: #666;
        }

        .timeline {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          margin: 20px 0;
        }

        .timeline-phase {
          background: #f8f9fa;
          border-radius: 6px;
          padding: 12px;
          font-size: 13px;
        }

        .phase-title {
          font-weight: bold;
          margin-bottom: 4px;
        }

        .phase-duration {
          color: #666;
          font-size: 12px;
          margin-bottom: 4px;
        }

        .footer {
          max-width: 6.5in;
          margin: 30px auto 0;
          text-align: center;
          font-size: 11px;
          color: #666;
          border-top: 1px solid #eee;
          padding-top: 15px;
          position: running(footer);
        }

        .page-number::after {
          content: counter(page);
          counter-increment: page;
        }

        @page {
          @bottom-center {
            content: element(footer);
          }
        }

        .info-box {
          background: #f8f9fa;
          border-left: 4px solid #16815A;
          padding: 15px;
          margin: 15px 0;
          font-size: 14px;
        }

        .time-impact-grid {
          display: grid;
          grid-template-columns: repeat(1, 1fr);
          gap: 15px;
          margin-bottom: 20px;
        }

        .time-metric {
          background: #f8f9fa;
          border-radius: 6px;
          padding: 15px;
          text-align: center;
        }

        .time-value {
          font-size: 24px;
          font-weight: bold;
          color: #38003C;
          margin: 10px 0;
        }

        .time-label {
          font-size: 13px;
          color: #666;
        }
      </style>

      <div class="header">
        <div class="header-content">
          <div class="logo-container">
            <img src="/images/Faye%20Logo%20-%20White.png" alt="Faye Logo" class="faye-logo" />
          </div>
          <div class="header-text">
            <h1>Front Office System Modernization</h1>
            <h2>Business Case & ROI Analysis</h2>
            <p>${showCorporateView ? 'Corporate View' : 'System-Wide View'}</p>
          </div>
          <div class="logo-container">
            <img src="/images/tjc-logo-reverse.jpg" alt="The Joint Logo" class="tjc-logo" />
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Executive Summary</div>
        <div class="metric-grid avoid-break">
          <div class="metric-card">
            <div class="metric-value">${formatCurrency(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</div>
            <div class="metric-label">Annual Benefits</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${(showCorporateView ? benefits.corporatePaybackPeriodMonths : benefits.paybackPeriodMonths).toFixed(1)} months</div>
            <div class="metric-label">Payback Period</div>
          </div>
          <div class="metric-card">
            <div class="metric-value">${(showCorporateView ? benefits.corporateFiveYearROI : benefits.fiveYearROI).toFixed(0)}%</div>
            <div class="metric-label">5-Year ROI</div>
          </div>
        </div>
        <p>
          The Joint Chiropractic's Front Office system modernization project presents a compelling business case with significant benefits for both corporate and franchise operations. Based on survey data from 411 staff members across the system, we've identified critical pain points that can be addressed through targeted improvements.
        </p>
        <div class="info-box avoid-break">
          ${showCorporateView 
            ? "This view presents the financial impact on The Joint's corporate entity, including royalties from franchise improvements and direct corporate benefits."
            : "This view shows the combined benefits across both corporate and franchise operations, demonstrating the total value creation for the network."}
        </div>
      </div>

      <div class="page-break"></div>

      <div class="section avoid-break">
        <div class="section-title">Stakeholder Analysis</div>
        
        <div class="stakeholder-section">
          <div class="stakeholder-title">CEO Perspective</div>
          <div class="stakeholder-content">
            <p><strong>Strategic Value:</strong> The modernization project directly addresses key operational challenges while supporting growth initiatives.</p>
            <div class="metric-grid">
              <div class="metric-card">
                <div class="metric-value">${data.clinicCount}</div>
                <div class="metric-label">Clinics Impacted</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${data.retentionImprovementPercent}%</div>
                <div class="metric-label">Retention Improvement</div>
              </div>
            </div>
          </div>
        </div>

        <div class="stakeholder-section">
          <div class="stakeholder-title">CFO Perspective</div>
          <div class="stakeholder-content">
            <p><strong>Financial Impact:</strong> The project demonstrates strong returns with clear cost control and revenue enhancement.</p>
            <div class="metric-grid">
              <div class="metric-card">
                <div class="metric-value">${formatCurrency(data.implementationCost)}</div>
                <div class="metric-label">Implementation Cost</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${data.revenueLeakageReductionPercent}%</div>
                <div class="metric-label">Revenue Recovery</div>
              </div>
            </div>
          </div>
        </div>

        <div class="stakeholder-section">
          <div class="stakeholder-title">CTO Perspective</div>
          <div class="stakeholder-content">
            <p><strong>Technical Benefits:</strong> Modern microservices architecture delivers improved reliability and maintainability.</p>
            <ul style="margin-top: 10px; padding-left: 20px;">
              <li>Reduced system refresh times by ${data.refreshReductionPercent}%</li>
              <li>Eliminated ${data.workaroundReductionPercent}% of technical workarounds</li>
              <li>Improved system stability and performance</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <div class="section-title">Research Findings & Industry Analysis</div>
        
        <div class="grid grid-cols-1 gap-6">
          <div>
            <h3 class="text-lg font-semibold mb-3">Survey Findings</h3>
            <div class="space-y-4">
              <div class="research-item">
                <div class="research-title">System Refresh Issues</div>
                <div class="research-stat">76.3%</div>
                <p>Staff report refreshing the system "constantly" or "frequently" (Q34)</p>
                <p class="text-sm text-gray-600 mt-1">Setting: ${data.refreshReductionPercent >= 70 ? 'Optimal' : data.refreshReductionPercent >= 50 ? 'Good' : 'Consider increasing'}</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Workaround Issues</div>
                <div class="research-stat">68.4%</div>
                <p>Staff describe having "a lot of inefficiencies, but I've learned workarounds" (Q6)</p>
                <p class="text-sm text-gray-600 mt-1">Setting: ${data.workaroundReductionPercent >= 65 ? 'Optimal' : data.workaroundReductionPercent >= 45 ? 'Good' : 'Consider increasing'}</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Extra Steps Issues</div>
                <div class="research-stat">62.8%</div>
                <p>Selected "Too many steps & dropdowns" for checkout (Q19)</p>
                <p class="text-sm text-gray-600 mt-1">Setting: ${data.extraStepsReductionPercent >= 60 ? 'Optimal' : data.extraStepsReductionPercent >= 40 ? 'Good' : 'Consider increasing'}</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Payment Processing Issues</div>
                <div class="research-stat">53.4%</div>
                <p>Reported payment processing failures in the past week (Q32)</p>
                <p class="text-sm text-gray-600 mt-1">Setting: ${data.revenueLeakageReductionPercent >= 50 ? 'Optimal' : data.revenueLeakageReductionPercent >= 30 ? 'Good' : 'Consider increasing'}</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Patient Retention</div>
                <div class="research-stat">-6%</div>
                <p>Wellness plan retention dropping from 70% to 64% (conference data)</p>
                <p class="text-sm text-gray-600 mt-1">Setting: ${data.retentionImprovementPercent >= 6 ? 'Optimal' : data.retentionImprovementPercent >= 3 ? 'Good' : 'Consider increasing'}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">Industry Research</h3>
            <div class="space-y-4">
              <div class="research-item">
                <div class="research-title">McKinsey & Company</div>
                <p class="text-sm text-gray-600">"Organizations implementing microservices architecture have reported up to a 30% reduction in IT costs through optimized resource utilization, reduced maintenance overhead, and independent service scaling."</p>
                <p class="text-sm text-gray-600 mt-1">Setting: ${data.itCostReductionPercent >= 25 ? 'Optimal' : data.itCostReductionPercent >= 15 ? 'Good' : 'Consider increasing'}</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Gartner</div>
                <p class="text-sm text-gray-600">"By 2025, 80% of digital businesses will adopt a composable architecture approach, resulting in improved application delivery by 80% and faster business value realization."</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Forrester</div>
                <p class="text-sm text-gray-600">"Healthcare organizations that modernize legacy systems through microservices architecture report 40% faster development cycles and 25-35% reduction in operational costs."</p>
                <p class="text-sm text-gray-600 mt-1">Setting: ${data.downtimeReductionPercent >= 40 ? 'Optimal' : data.downtimeReductionPercent >= 25 ? 'Good' : 'Consider increasing'}</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Market Growth</div>
                <p class="text-sm text-gray-600">The global microservices architecture market is projected to reach $15.97 billion by 2029, growing at a CAGR of 21% from 2022 to 2029.</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Implementation Cost Benchmark</div>
                <p class="text-sm text-gray-600">Industry average for similar healthcare software modernization projects ranges from $250,000 to $500,000.</p>
                <p class="text-sm text-gray-600 mt-1">Your setting: ${data.implementationCost <= 350000 ? 'Competitive' : data.implementationCost <= 450000 ? 'Average' : 'Above average'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Time Impact Analysis</div>
        <div class="time-impact-grid">
          <div class="time-metric">
            <div class="time-label">System Refresh Time</div>
            <div class="time-value">${data.refreshReductionPercent}%</div>
            <div class="time-label">Reduction</div>
          </div>
          <div class="time-metric">
            <div class="time-label">Process Steps</div>
            <div class="time-value">${data.extraStepsReductionPercent}%</div>
            <div class="time-label">Improvement</div>
          </div>
          <div class="time-metric">
            <div class="time-label">Workarounds</div>
            <div class="time-value">${data.workaroundReductionPercent}%</div>
            <div class="time-label">Eliminated</div>
          </div>
        </div>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <div class="section-title">Benefits Analysis</div>
        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-header">
              <div class="benefit-title">Time Savings</div>
            </div>
            <div class="benefit-value">${formatCurrency(showCorporateView ? benefits.corporateTimeSavingsValue : benefits.timeSavingsValue)}</div>
            <div class="benefit-description">Reduction in system refresh times (${data.refreshReductionPercent}%) and elimination of workarounds</div>
          </div>
          <div class="benefit-item">
            <div class="benefit-header">
              <div class="benefit-title">Revenue Recovery</div>
            </div>
            <div class="benefit-value">${formatCurrency(showCorporateView ? benefits.corporateRevenueLeakageRecovery : benefits.revenueLeakageRecovery)}</div>
            <div class="benefit-description">Improved payment processing and reduced revenue leakage</div>
          </div>
          <div class="benefit-item">
            <div class="benefit-header">
              <div class="benefit-title">Patient Retention</div>
            </div>
            <div class="benefit-value">${formatCurrency(showCorporateView ? benefits.corporateRetentionImprovementValue : benefits.retentionImprovementValue)}</div>
            <div class="benefit-description">Enhanced patient experience leading to improved retention rates</div>
          </div>
          <div class="benefit-item">
            <div class="benefit-header">
              <div class="benefit-title">IT Cost Reduction</div>
            </div>
            <div class="benefit-value">${formatCurrency(benefits.itCostReduction)}</div>
            <div class="benefit-description">Decreased maintenance and support costs through modern architecture</div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Financial Impact</div>
        <div class="financial-table">
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Annual Benefits</th>
                <th>Implementation Cost</th>
                <th>Net Impact</th>
                <th>Cumulative Return</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Year 1</td>
                <td>${formatCurrency(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</td>
                <td>(${formatCurrency(data.implementationCost)})</td>
                <td>${formatCurrency((showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits) - data.implementationCost)}</td>
                <td>${formatCurrency((showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits) - data.implementationCost)}</td>
              </tr>
              <tr>
                <td>Year 2</td>
                <td>${formatCurrency(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</td>
                <td>$0</td>
                <td>${formatCurrency(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</td>
                <td>${formatCurrency((showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits) * 2 - data.implementationCost)}</td>
              </tr>
              <tr>
                <td>Year 3</td>
                <td>${formatCurrency(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</td>
                <td>$0</td>
                <td>${formatCurrency(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</td>
                <td>${formatCurrency((showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits) * 3 - data.implementationCost)}</td>
              </tr>
              <tr>
                <td>Year 4</td>
                <td>${formatCurrency(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</td>
                <td>$0</td>
                <td>${formatCurrency(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</td>
                <td>${formatCurrency((showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits) * 4 - data.implementationCost)}</td>
              </tr>
              <tr>
                <td>Year 5</td>
                <td>${formatCurrency(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</td>
                <td>$0</td>
                <td>${formatCurrency(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</td>
                <td>${formatCurrency((showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits) * 5 - data.implementationCost)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Implementation Timeline</div>
        <div class="timeline">
          <div class="timeline-phase">
            <div class="phase-title">SOW 1: Initial Implementation Setup</div>
            <div class="phase-duration">Sprints 1-4 (2 months)</div>
            <p>UI Specification & Behavior Design (350h)</p>
            <p>System Architecture & API Planning (80h)</p>
            <p>Implementation Alignment Support (40h)</p>
            <p>Engineering Coordination (55h)</p>
          </div>
          <div class="timeline-phase">
            <div class="phase-title">SOW 2: Full-Stack Feature Development</div>
            <div class="phase-duration">Sprints 5-10 (2.5 months)</div>
            <p>Front-End Development (240h)</p>
            <p>Back-End Development (192h)</p>
            <p>Development QA Execution (96h)</p>
            <p>Engineering Coordination (72h)</p>
          </div>
          <div class="timeline-phase">
            <div class="phase-title">SOW 3: Finalization & Deployment</div>
            <div class="phase-duration">Sprints 11-16 (1.5 months)</div>
            <p>Implementation Engineering (275h)</p>
            <p>Validation QA (24h)</p>
            <p>Environment & Deployment Ops (48h)</p>
            <p>Technical Integration Support (80h)</p>
            <p>Development Support Services (73h)</p>
          </div>
        </div>
        <div class="info-box">
          <p>Total Duration: 6 months | Total Hours: ${(78750 + 90000 + 75000) / 150} hours</p>
          <p>This implementation plan follows ASC 350-40 guidelines for software capitalization. All development activities qualify for capitalization under these guidelines.</p>
        </div>
      </div>

      <div class="footer">
        <p>Generated on ${new Date().toLocaleDateString()} | The Joint Chiropractic Front Office Modernization | Page <span class="page-number"></span></p>
        <p>Prepared by Faye Business Solutions | WE EAT SOFTWARE</p>
      </div>
    `;

    // Configure PDF options
    const opt = {
      margin: [0.5, 0.5, 0.5, 0.5],
      filename: `The_Joint_Front_Office_Business_Case_${showCorporateView ? 'Corporate' : 'System'}_View.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: false,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'in',
        format: 'letter',
        orientation: 'portrait'
      }
    };
    
    html2pdf().set(opt).from(element).save();
  };
  
  return (
    <button
      onClick={handleExport}
      className="bg-[#3A0A3A] hover:bg-[#4B1B4B] text-white font-bold py-2 px-4 rounded flex items-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
      </svg>
      Export to PDF ({showCorporateView ? 'Corporate View' : 'System-Wide View'})
    </button>
  );
};

export default PDFExport;
