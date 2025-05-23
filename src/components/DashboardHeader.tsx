import React from 'react';

const DashboardHeader: React.FC = () => {
  return (
    <div className="bg-blueberry text-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src="/images/Faye%20Logo%20-%20White.png" 
            alt="Faye Logo" 
            className="h-12"
          />
          <div className="ml-3 border-l border-white/20 pl-3">
            <p className="text-sm font-light tracking-wider">WE EAT SOFTWARE</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-8">
          <div className="text-right">
            <h2 className="text-2xl font-bold">Front Office Business Case</h2>
            <p className="text-sm text-white/80">ROI Calculator & Implementation Timeline</p>
          </div>
          <div className="h-12 border-l border-white/20"></div>
          <div>
            <img 
              src="/images/tjc-logo-reverse.jpg" 
              alt="The Joint Chiropractic Logo" 
              className="h-12 object-contain"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t border-white/10 pt-6 flex justify-between items-center">
        <p className="text-lg font-light leading-relaxed max-w-4xl">
          <span className="bg-gradient-to-r from-tech-teal via-tech-pink to-tech-violet bg-clip-text text-transparent">
            An interactive business case for implementing Front Office system improvements 
            across The Joint Chiropractic's network of clinics.
          </span>
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const excelExport = document.querySelector('.excel-export');
              if (excelExport) {
                excelExport.querySelector('button')?.click();
              }
            }}
            className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all"
            title="Export to Excel"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
          <button
            onClick={() => {
              const pdfExport = document.querySelector('.pdf-export');
              if (pdfExport) {
                pdfExport.querySelector('button')?.click();
              }
            }}
            className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/10 transition-all"
            title="Export to PDF"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
