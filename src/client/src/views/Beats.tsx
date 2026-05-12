import React from 'react';

const Beats: React.FC = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-[#0F1B13] dark group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <div className="flex items-center justify-center py-8">
          <h1 className="text-white text-4xl font-bold leading-tight tracking-[-0.015em]">
            My Beats
          </h1>
        </div>

        <div className="flex flex-1 justify-center px-8 py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
            <div className="flex flex-col gap-4 bg-[#122118] rounded-lg px-6 py-4 mb-8">
              <h2 className="text-white text-2xl font-bold leading-tight tracking-[-0.015em] mb-4">
                Featured Tracks
              </h2>
              <div className="text-[#96c5a8] text-base font-normal leading-normal">
                Your beat collection will appear here. Start creating and uploading your tracks!
              </div>
            </div>

            <div className="flex justify-center">
              <div className="gap-4 flex flex-wrap justify-center">
                <div className="flex flex-col items-center gap-2 bg-[#122118] py-2.5 text-center w-20">
                  <div className="rounded-full bg-[#264532] p-2.5">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M237.66,178.34a8,8,0,0,1,0,11.32l-24,24a8,8,0,0,1-11.32-11.32L212.69,192H200.94a72.12,72.12,0,0,1-58.59-30.15l-41.72-58.4A56.1,56.1,0,0,0,55.06,80H32a8,8,0,0,1,0-16H55.06a72.12,72.12,0,0,1,58.59,30.15l41.72,58.4A56.1,56.1,0,0,0,200.94,176h11.75l-10.35-10.34a8,8,0,0,1,11.32-11.32ZM143,107a8,8,0,0,0,11.16-1.86l1.2-1.67A56.1,56.1,0,0,1,200.94,80h11.75L202.34,90.34a8,8,0,0,0,11.32,11.32l24-24a8,8,0,0,0,0-11.32l-24-24a8,8,0,0,0-11.32,11.32L212.69,64H200.94a72.12,72.12,0,0,0-58.59,30.15l-1.2,1.67A8,8,0,0,0,143,107Zm-30,42a8,8,0,0,0-11.16,1.86l-1.2,1.67A56.1,56.1,0,0,1,55.06,176H32a8,8,0,0,0,0,16H55.06a72.12,72.12,0,0,0,58.59-30.15l1.2-1.67A8,8,0,0,0,113,149Z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">Shuffle</p>
                </div>

                <div className="flex flex-col items-center gap-2 bg-[#122118] py-2.5 text-center w-20">
                  <div className="rounded-full bg-[#264532] p-2.5">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M223.77,58a16,16,0,0,0-16.25.53L128,109.14V71.84A15.91,15.91,0,0,0,103.52,58.5L15.33,114.66a15.8,15.8,0,0,0,0,26.68l88.19,56.16A15.91,15.91,0,0,0,128,184.16v-37.3l79.52,50.64A15.91,15.91,0,0,0,232,184.16V71.84A15.83,15.83,0,0,0,223.77,58ZM112,183.93,24.18,128,112,72.06Zm104,0L128.18,128,216,72.06Z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">Previous</p>
                </div>

                <div className="flex flex-col items-center gap-2 bg-[#122118] py-2.5 text-center w-20">
                  <div className="rounded-full bg-[#264532] p-2.5">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M240.67,114.66,152.48,58.5A15.91,15.91,0,0,0,128,71.84v37.3L48.48,58.5A15.91,15.91,0,0,0,24,71.84V184.16A15.92,15.92,0,0,0,48.48,197.5L128,146.86v37.3a15.92,15.92,0,0,0,24.48,13.34l88.19-56.16a15.8,15.8,0,0,0,0-26.68ZM40,183.94V72.07L127.82,128Zm104,0V72.07L231.82,128Z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">Next</p>
                </div>

                <div className="flex flex-col items-center gap-2 bg-[#122118] py-2.5 text-center w-20">
                  <div className="rounded-full bg-[#264532] p-2.5">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M178,32c-20.65,0-38.73,8.88-50,23.89C116.73,40.88,98.65,32,78,32A62.07,62.07,0,0,0,16,94c0,70,103.79,126.66,108.21,129a8,8,0,0,0,7.58,0C136.21,220.66,240,164,240,94A62.07,62.07,0,0,0,178,32ZM128,206.8C109.74,196.16,32,147.69,32,94A46.06,46.06,0,0,1,78,48c19.45,0,35.78,10.36,42.6,27a8,8,0,0,0,14.8,0c6.82-16.67,23.15-27,42.6-27a46.06,46.06,0,0,1,46,46C224,147.61,146.24,196.15,128,206.8Z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">Favorite</p>
                </div>

                <div className="flex flex-col items-center gap-2 bg-[#122118] py-2.5 text-center w-20">
                  <div className="rounded-full bg-[#264532] p-2.5">
                    <div className="text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M224,128a8,8,0,0,1-8,8H136v80a8,8,0,0,1-16,0V136H40a8,8,0,0,1,0-16h80V40a8,8,0,0,1,16,0v80h80A8,8,0,0,1,224,128Z"></path>
                      </svg>
                    </div>
                  </div>
                  <p className="text-white text-sm font-medium leading-normal">Add</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Beats;
