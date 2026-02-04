import React from 'react';
import { BusinessCaseData, BenefitCalculation, formatCurrency, formatLargeNumber } from '../lib/data';

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
            <img src="images/Faye%20Logo%20-%20White.png" alt="Faye Logo" class="faye-logo" />
          </div>
          <div class="header-text">
            <h1>Front Office System Modernization</h1>
            <h2>Business Case & ROI Analysis</h2>
            <p>${showCorporateView ? 'Corporate View' : 'System-Wide View'}</p>
          </div>
          <div class="logo-container">
            <img src="images/tjc-logo-reverse.jpg" alt="The Joint Logo" class="tjc-logo" />
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

      <!-- ROI Variables Table Section -->
      <div class="section avoid-break">
        <div class="section-title">Key Inputs & Calculated Benefits</div>
        <table style="width:100%; border-collapse:collapse; font-size:13px;">
          <thead>
            <tr style="background:#f3f3f3;">
              <th style="border:1px solid #ccc; padding:6px; text-align:left;">Category</th>
              <th style="border:1px solid #ccc; padding:6px; text-align:right;">Value</th>
              <th style="border:1px solid #ccc; padding:6px; text-align:left;">Description</th>
            </tr>
          </thead>
          <tbody>
            ${[
              // Global Parameters
              ['Clinic Count', `${data.clinicCount}`, 'Total franchise locations in network'],
              ['Avg Clinic Revenue', formatCurrency(data.averageClinicRevenue), 'Annual revenue per clinic'],
              ['Wellness Plan Price', formatCurrency(data.wellnessPlanPrice) + '/mo', 'Monthly membership fee'],
              ['Corporate Royalty', `${data.corporateRoyaltyPercent}%`, 'Royalty % on franchise revenue'],
              // Section Benefits
              ['Acquisition Benefit', formatCurrency(benefits.sectionBenefits.acquisitionBenefit), 'Marketing cost savings from lead quality improvements'],
              ['Conversion Benefit', formatCurrency(benefits.sectionBenefits.conversionBenefit), 'Revenue from improved lead-to-patient conversion'],
              ['Retention Benefit', formatCurrency(benefits.sectionBenefits.retentionBenefit), 'Value from improved patient retention'],
              ['Operations Benefit', formatCurrency(benefits.sectionBenefits.operationsBenefit), 'Time savings + revenue recovery + IT costs'],
              // Key Totals
              ['Total Annual Benefits', formatCurrency(benefits.totalAnnualBenefits), 'System-wide annual recurring benefits'],
              ['Corporate Annual Benefits', formatCurrency(benefits.corporateAnnualBenefits), 'Corporate share of benefits'],
              ['Franchise Annual Benefits', formatCurrency(benefits.franchiseAnnualBenefits), 'Franchise share of benefits'],
              // ROI Metrics
              ['Payback Period', benefits.paybackPeriodMonths.toFixed(1) + ' months', 'Time to break even (system-wide)'],
              ['Corporate Payback', benefits.corporatePaybackPeriodMonths.toFixed(1) + ' months', 'Time to break even (corporate)'],
              ['5-Year ROI', benefits.fiveYearROI.toFixed(0) + '%', 'Five-year cumulative ROI'],
              ['5-Year Benefits', formatCurrency(benefits.fiveYearCumulativeBenefits), 'Total 5-year system-wide benefits'],
              // Operations Details
              ['Time Savings Value', formatCurrency(benefits.timeSavingsValue), `${data.currentSystemTimeMinutes}min/day × ${data.timeReductionPercent}% reduction`],
              ['Revenue Recovery', formatCurrency(benefits.revenueLeakageRecovery), `${data.currentRevenueLeakagePercent}% leakage × ${data.revenueLeakageReductionPercent}% recovered`],
              ['IT Cost Reduction', formatCurrency(benefits.itCostReduction), `${data.itCostReductionPercent}% of ${formatCurrency(data.currentAnnualITCosts)} IT costs`],
              // Implementation
              ['Implementation Cost', formatCurrency(data.implementationCost), `CapEx: ${formatCurrency(data.implementationCapEx)} + OpEx: ${formatCurrency(data.implementationOpEx)}`],
              ['Recurring Annual OpEx', formatCurrency(data.recurringAnnualOpEx), `Annual ongoing costs (+${data.annualInflationRate}% inflation)`]
            ].map(([key, value, desc]) => `
              <tr>
                <td style="border:1px solid #ccc; padding:6px;">${key}</td>
                <td style="border:1px solid #ccc; padding:6px; text-align:right;">${value}</td>
                <td style="border:1px solid #ccc; padding:6px;">${desc}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>

      <div class="page-break"></div>

      <div class="section avoid-break">
        <div class="section-title">Stakeholder Analysis</div>
        
        <div class="stakeholder-section">
          <div class="stakeholder-title">CEO Perspective</div>
          <div class="stakeholder-content">
            <p><strong>Strategic Value:</strong> The modernization project directly addresses key operational challenges while supporting growth initiatives across the entire customer journey.</p>
            <div class="metric-grid">
              <div class="metric-card">
                <div class="metric-value">${data.clinicCount}</div>
                <div class="metric-label">Clinics Impacted</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">+${data.retentionImprovementPercent} pts</div>
                <div class="metric-label">Retention Improvement</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">+${data.appointmentRateImprovement} pts</div>
                <div class="metric-label">Booking Rate Improvement</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">+${data.planConversionImprovement} pts</div>
                <div class="metric-label">Plan Conversion Improvement</div>
              </div>
            </div>
          </div>
        </div>

        <div class="stakeholder-section">
          <div class="stakeholder-title">CFO Perspective</div>
          <div class="stakeholder-content">
            <p><strong>Financial Impact:</strong> The project demonstrates strong returns with clear cost structure and multiple revenue enhancement paths.</p>
            <div class="metric-grid">
              <div class="metric-card">
                <div class="metric-value">${formatCurrency(data.implementationCapEx)}</div>
                <div class="metric-label">Implementation CapEx</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${formatCurrency(data.implementationOpEx)}</div>
                <div class="metric-label">Implementation OpEx</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${data.revenueLeakageReductionPercent}%</div>
                <div class="metric-label">Revenue Leakage Recovered</div>
              </div>
              <div class="metric-card">
                <div class="metric-value">${formatCurrency(data.recurringAnnualOpEx)}/yr</div>
                <div class="metric-label">Recurring OpEx</div>
              </div>
            </div>
          </div>
        </div>

        <div class="stakeholder-section">
          <div class="stakeholder-title">CTO Perspective</div>
          <div class="stakeholder-content">
            <p><strong>Technical Benefits:</strong> Modern microservices architecture delivers improved reliability, maintainability, and operational efficiency.</p>
            <ul style="margin-top: 10px; padding-left: 20px;">
              <li>System time reduced by ${data.timeReductionPercent}% (${Math.round(data.currentSystemTimeMinutes * data.timeReductionPercent / 100)} minutes saved per day)</li>
              <li>IT cost reduction of ${data.itCostReductionPercent}% (${formatCurrency(benefits.itCostReduction)}/year)</li>
              <li>Downtime reduction target: ${data.downtimeReductionPercent}%</li>
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
                <div class="research-title">System Time Issues</div>
                <div class="research-stat">76.3%</div>
                <p>Staff report refreshing the system "constantly" or "frequently" (Q34)</p>
                <p class="text-sm text-gray-600 mt-1">Your setting: ${data.timeReductionPercent}% reduction of ${data.currentSystemTimeMinutes} min/day</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Payment Processing Issues</div>
                <div class="research-stat">53.4%</div>
                <p>Reported payment processing failures in the past week (Q32)</p>
                <p class="text-sm text-gray-600 mt-1">Your setting: ${data.revenueLeakageReductionPercent}% of ${data.currentRevenueLeakagePercent}% leakage recovered</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Patient Retention</div>
                <div class="research-stat">64%</div>
                <p>Current wellness plan retention (down from 70%)</p>
                <p class="text-sm text-gray-600 mt-1">Your setting: +${data.retentionImprovementPercent} pts improvement targeted</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Conversion Funnel</div>
                <div class="research-stat">${data.leadToAppointmentRate}%</div>
                <p>Current booking rate from qualified leads</p>
                <p class="text-sm text-gray-600 mt-1">Your setting: +${data.appointmentRateImprovement} pts booking, +${data.showRateImprovement} pts show rate</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Plan Conversion</div>
                <div class="research-stat">${data.planConversionRate}%</div>
                <p>Current rate of first-time patients converting to plans</p>
                <p class="text-sm text-gray-600 mt-1">Your setting: +${data.planConversionImprovement} pts improvement targeted</p>
              </div>
            </div>
          </div>

          <div>
            <h3 class="text-lg font-semibold mb-3">Industry Research</h3>
            <div class="space-y-4">
              <div class="research-item">
                <div class="research-title">McKinsey & Company</div>
                <p class="text-sm text-gray-600">"Organizations implementing microservices architecture have reported up to a 30% reduction in IT costs through optimized resource utilization, reduced maintenance overhead, and independent service scaling."</p>
                <p class="text-sm text-gray-600 mt-1">Your setting: ${data.itCostReductionPercent}% IT cost reduction</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Gartner</div>
                <p class="text-sm text-gray-600">"By 2025, 80% of digital businesses will adopt a composable architecture approach, resulting in improved application delivery by 80% and faster business value realization."</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Forrester</div>
                <p class="text-sm text-gray-600">"Healthcare organizations that modernize legacy systems through microservices architecture report 40% faster development cycles and 25-35% reduction in operational costs."</p>
                <p class="text-sm text-gray-600 mt-1">Your setting: ${data.downtimeReductionPercent}% downtime reduction</p>
              </div>
              
              <div class="research-item">
                <div class="research-title">Implementation Cost Benchmark</div>
                <p class="text-sm text-gray-600">Industry average for similar healthcare software modernization projects ranges from $250,000 to $500,000.</p>
                <p class="text-sm text-gray-600 mt-1">Your setting: ${formatCurrency(data.implementationCost)} (${data.implementationCost <= 350000 ? 'Competitive' : data.implementationCost <= 450000 ? 'Average' : 'Above average'})</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-title">Baseline vs Future State Comparison</div>
        <table>
          <thead>
            <tr>
              <th>Category / Metric</th>
              <th style="text-align:center;">Baseline</th>
              <th style="text-align:center;">Future State</th>
              <th style="text-align:center;">Change</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background:#f3f3f3;"><td colspan="4"><strong>Global Parameters</strong></td></tr>
            <tr>
              <td>Number of Clinics</td>
              <td style="text-align:center;">${data.clinicCount}</td>
              <td style="text-align:center;">${Math.round(data.clinicCount * (1 + data.clinicCountChange / 100))}</td>
              <td style="text-align:center;">${data.clinicCountChange !== 0 ? (data.clinicCountChange > 0 ? '+' : '') + data.clinicCountChange + '%' : '—'}</td>
            </tr>
            <tr>
              <td>Monthly Leads/Clinic</td>
              <td style="text-align:center;">${data.monthlyLeadsPerClinic}</td>
              <td style="text-align:center;">${Math.round(data.monthlyLeadsPerClinic * (1 + data.monthlyLeadsChange / 100))}</td>
              <td style="text-align:center;">${data.monthlyLeadsChange !== 0 ? (data.monthlyLeadsChange > 0 ? '+' : '') + data.monthlyLeadsChange + '%' : '—'}</td>
            </tr>
            <tr>
              <td>Average Clinic Revenue</td>
              <td style="text-align:center;">${formatCurrency(data.averageClinicRevenue)}</td>
              <td style="text-align:center;">${formatCurrency(data.averageClinicRevenue * (1 + data.averageClinicRevenueChange / 100))}</td>
              <td style="text-align:center;">${data.averageClinicRevenueChange !== 0 ? (data.averageClinicRevenueChange > 0 ? '+' : '') + data.averageClinicRevenueChange + '%' : '—'}</td>
            </tr>
            <tr>
              <td>Wellness Plan Price</td>
              <td style="text-align:center;">$${data.wellnessPlanPrice}/mo</td>
              <td style="text-align:center;">$${Math.round(data.wellnessPlanPrice * (1 + data.wellnessPlanPriceChange / 100))}/mo</td>
              <td style="text-align:center;">${data.wellnessPlanPriceChange !== 0 ? (data.wellnessPlanPriceChange > 0 ? '+' : '') + data.wellnessPlanPriceChange + '%' : '—'}</td>
            </tr>
            <tr>
              <td>Patient LTV (months)</td>
              <td style="text-align:center;">${data.averagePatientLTVMonths}</td>
              <td style="text-align:center;">${Math.round(data.averagePatientLTVMonths * (1 + data.patientLTVChange / 100))}</td>
              <td style="text-align:center;">${data.patientLTVChange !== 0 ? (data.patientLTVChange > 0 ? '+' : '') + data.patientLTVChange + '%' : '—'}</td>
            </tr>
            <tr style="background:#f3f3f3;"><td colspan="4"><strong>1. Lead Identification</strong></td></tr>
            <tr>
              <td>Cost Per Lead</td>
              <td style="text-align:center;">$${data.costPerLead}</td>
              <td style="text-align:center;">$${(data.costPerLead * (1 - data.costPerLeadReductionPercent / 100)).toFixed(2)}</td>
              <td style="text-align:center;">${data.costPerLeadReductionPercent !== 0 ? '-' + data.costPerLeadReductionPercent + '%' : '—'}</td>
            </tr>
            <tr style="background:#f3f3f3;"><td colspan="4"><strong>2. Lead → Patient Conversion</strong></td></tr>
            <tr>
              <td>Booking Rate</td>
              <td style="text-align:center;">${data.leadToAppointmentRate}%</td>
              <td style="text-align:center;">${data.leadToAppointmentRate + data.appointmentRateImprovement}%</td>
              <td style="text-align:center;">${data.appointmentRateImprovement !== 0 ? '+' + data.appointmentRateImprovement + ' pts' : '—'}</td>
            </tr>
            <tr>
              <td>Show Rate</td>
              <td style="text-align:center;">${data.appointmentShowRate}%</td>
              <td style="text-align:center;">${data.appointmentShowRate + data.showRateImprovement}%</td>
              <td style="text-align:center;">${data.showRateImprovement !== 0 ? '+' + data.showRateImprovement + ' pts' : '—'}</td>
            </tr>
            <tr>
              <td>Effective Conversion</td>
              <td style="text-align:center;">${Math.round(data.leadToAppointmentRate * data.appointmentShowRate / 100)}%</td>
              <td style="text-align:center;">${Math.round((data.leadToAppointmentRate + data.appointmentRateImprovement) * (data.appointmentShowRate + data.showRateImprovement) / 100)}%</td>
              <td style="text-align:center;">+${Math.round((data.leadToAppointmentRate + data.appointmentRateImprovement) * (data.appointmentShowRate + data.showRateImprovement) / 100) - Math.round(data.leadToAppointmentRate * data.appointmentShowRate / 100)} pts</td>
            </tr>
            <tr style="background:#f3f3f3;"><td colspan="4"><strong>3. Patient Retention</strong></td></tr>
            <tr>
              <td>Plan Conversion Rate</td>
              <td style="text-align:center;">${data.planConversionRate}%</td>
              <td style="text-align:center;">${data.planConversionRate + data.planConversionImprovement}%</td>
              <td style="text-align:center;">${data.planConversionImprovement !== 0 ? '+' + data.planConversionImprovement + ' pts' : '—'}</td>
            </tr>
            <tr>
              <td>Retention Rate</td>
              <td style="text-align:center;">${data.currentRetentionRate}%</td>
              <td style="text-align:center;">${data.currentRetentionRate + data.retentionImprovementPercent}%</td>
              <td style="text-align:center;">${data.retentionImprovementPercent !== 0 ? '+' + data.retentionImprovementPercent + ' pts' : '—'}</td>
            </tr>
            <tr style="background:#f3f3f3;"><td colspan="4"><strong>4. Clinic Operations</strong></td></tr>
            <tr>
              <td>System Time / Day</td>
              <td style="text-align:center;">${data.currentSystemTimeMinutes} min</td>
              <td style="text-align:center;">${Math.round(data.currentSystemTimeMinutes * (1 - data.timeReductionPercent / 100))} min</td>
              <td style="text-align:center;">${data.timeReductionPercent !== 0 ? '-' + data.timeReductionPercent + '%' : '—'}</td>
            </tr>
            <tr>
              <td>Revenue Leakage</td>
              <td style="text-align:center;">${data.currentRevenueLeakagePercent}%</td>
              <td style="text-align:center;">${(data.currentRevenueLeakagePercent * (1 - data.revenueLeakageReductionPercent / 100)).toFixed(2)}%</td>
              <td style="text-align:center;">${data.revenueLeakageReductionPercent !== 0 ? '-' + data.revenueLeakageReductionPercent + '%' : '—'}</td>
            </tr>
            <tr>
              <td>Annual IT Costs</td>
              <td style="text-align:center;">${formatCurrency(data.currentAnnualITCosts)}</td>
              <td style="text-align:center;">${formatCurrency(data.currentAnnualITCosts * (1 - data.itCostReductionPercent / 100))}</td>
              <td style="text-align:center;">${data.itCostReductionPercent !== 0 ? '-' + data.itCostReductionPercent + '%' : '—'}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="page-break"></div>

      <div class="section">
        <div class="section-title">Benefits Analysis by Customer Journey Stage</div>
        <div class="benefits-grid">
          <div class="benefit-item">
            <div class="benefit-header">
              <div class="benefit-title">1. Lead Identification (Acquisition)</div>
            </div>
            <div class="benefit-value">${formatCurrency(benefits.sectionBenefits.acquisitionBenefit)}</div>
            <div class="benefit-description">Marketing cost savings from improved lead quality and reduced cost per lead (${data.costPerLeadReductionPercent}% reduction)</div>
          </div>
          <div class="benefit-item">
            <div class="benefit-header">
              <div class="benefit-title">2. Lead → Patient Conversion</div>
            </div>
            <div class="benefit-value">${formatCurrency(benefits.sectionBenefits.conversionBenefit)}</div>
            <div class="benefit-description">Revenue from improved booking rate (+${data.appointmentRateImprovement} pts) and show rate (+${data.showRateImprovement} pts)</div>
          </div>
          <div class="benefit-item">
            <div class="benefit-header">
              <div class="benefit-title">3. Patient Retention</div>
            </div>
            <div class="benefit-value">${formatCurrency(benefits.sectionBenefits.retentionBenefit)}</div>
            <div class="benefit-description">Value from improved plan conversion (+${data.planConversionImprovement} pts) and retention rate (+${data.retentionImprovementPercent} pts)</div>
          </div>
          <div class="benefit-item">
            <div class="benefit-header">
              <div class="benefit-title">4. Clinic Operations</div>
            </div>
            <div class="benefit-value">${formatCurrency(benefits.sectionBenefits.operationsBenefit)}</div>
            <div class="benefit-description">
              Time savings (${formatCurrency(benefits.timeSavingsValue)}) + 
              Revenue recovery (${formatCurrency(benefits.revenueLeakageRecovery)}) + 
              IT cost reduction (${formatCurrency(benefits.itCostReduction)})
            </div>
          </div>
        </div>
        <div class="info-box">
          <p><strong>Total Annual Benefits:</strong> ${formatCurrency(benefits.totalAnnualBenefits)} (System-Wide) | ${formatCurrency(benefits.corporateAnnualBenefits)} (Corporate)</p>
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
        <div class="section-title">Implementation Timeline & Investment</div>
        <div class="timeline">
          <div class="timeline-phase">
            <div class="phase-title">Phase 1: Discovery & Design</div>
            <div class="phase-duration">Months 1-2</div>
            <p>• Requirements gathering</p>
            <p>• UI/UX specification</p>
            <p>• System architecture</p>
            <p>• API design</p>
          </div>
          <div class="timeline-phase">
            <div class="phase-title">Phase 2: Development</div>
            <div class="phase-duration">Months 3-5</div>
            <p>• Front-End development</p>
            <p>• Back-End development</p>
            <p>• Integration work</p>
            <p>• QA testing</p>
          </div>
          <div class="timeline-phase">
            <div class="phase-title">Phase 3: Deployment</div>
            <div class="phase-duration">Month 6</div>
            <p>• User acceptance testing</p>
            <p>• Training & change mgmt</p>
            <p>• Rollout & monitoring</p>
            <p>• Support transition</p>
          </div>
        </div>
        <div class="info-box">
          <p><strong>Investment Summary:</strong></p>
          <p>• CapEx (Capitalizable): ${formatCurrency(data.implementationCapEx)} - Software development, architecture, infrastructure</p>
          <p>• OpEx (Expensed): ${formatCurrency(data.implementationOpEx)} - Training, change management, project oversight</p>
          <p>• Recurring OpEx: ${formatCurrency(data.recurringAnnualOpEx)}/year (+${data.annualInflationRate}% annual inflation)</p>
          <p style="margin-top: 10px;">This implementation plan follows ASC 350-40 guidelines for software capitalization. CapEx will be amortized over 5 years.</p>
        </div>
      </div>

      <div class="section">
        <div class="section-title">P&L ROI Schedule (5-Year Amortization)</div>
        <table>
          <thead>
            <tr>
              <th>Year</th>
              <th>Annual Benefits</th>
              <th>Amortization Expense</th>
              <th>Net Annual Impact</th>
              <th>Cumulative Impact</th>
            </tr>
          </thead>
          <tbody>
            ${Array.from({ length: 5 }, (_, i) => {
              const year = i + 1;
              const annualAmortization = data.implementationCost / 5;
              const netAnnualImpact = (showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits) - annualAmortization;
              const cumulativeImpact = netAnnualImpact * year;
              return `
                <tr>
                  <td>Year ${year}</td>
                  <td>$${formatLargeNumber(showCorporateView ? benefits.corporateAnnualBenefits : benefits.totalAnnualBenefits)}</td>
                  <td>$${formatLargeNumber(annualAmortization)}</td>
                  <td>$${formatLargeNumber(netAnnualImpact)}</td>
                  <td>$${formatLargeNumber(cumulativeImpact)}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
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
