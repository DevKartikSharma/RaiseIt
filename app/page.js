import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full  select-none px-2">
      <div className="w-full max-w-screen-lg mx-auto flex flex-col items-center pt-16">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-4xl md:text-5xl baloo-semibold text-center md:text-left">
          <span className="pt-8 pl-0 md:pl-8">Get me A chai</span>
          <span><Image src="/tea.gif" width={120} height={120} alt="Chai" /></span>
        </div>
        <div className="text-lg md:text-xl baloo-regular flex flex-col justify-center items-center pb-10 md:pb-20 mt-6 text-[rgb(191,191,191)]">
          <h2>A crowdFunding platform for Needy people</h2>
          <h2>You can buy a chai to them</h2>
        </div>
        <div className="border-b border-[rgb(62,62,71)] w-full mb-10"></div>
        <div className="flex flex-col items-center space-y-8 md:space-y-10 py-10 w-full">
          <h4 className="text-2xl md:text-3xl baloo-semibold text-white">Concept of our Chai</h4>
          <div className="flex flex-col md:flex-row justify-around items-center w-full gap-8 md:gap-0">
            <div className="baloo-light flex flex-col justify-center items-center space-y-3 w-full md:w-1/3">
              <Image src="/man.gif" width={80} height={80} className="p-2 bg-[rgb(46,46,46)] rounded-full overflow-clip border-[1px] border-gray-300" alt="Man" />
              <div className="flex flex-col justify-center items-center">
                <h6 className="text-base md:text-lg w-40 text-center">You can buy <b className="font-bold">Chai</b> to needy</h6>
              </div>
            </div>
            <div className="baloo-light flex flex-col justify-center items-center space-y-3 w-full md:w-1/3">
              <Image src="/coin.gif" width={80} height={80} className="p-2 bg-[rgb(46,46,46)] rounded-full overflow-clip border-[1px] border-gray-300" alt="Coin" />
              <div className="flex flex-col justify-center items-center">
                <h6 className="text-base md:text-lg w-40 text-center">Some need this <b className="font-bold">Chai</b> more than you</h6>
              </div>
            </div>
            <div className="baloo-light flex flex-col justify-center items-center space-y-3 w-full md:w-1/3">
              <Image src="/avatar.gif" width={80} height={80} className="p-2 bg-[rgb(46,46,46)] rounded-full overflow-clip border-[1px] border-gray-300" alt="Avatar" />
              <div className="flex flex-col justify-center items-center">
                <h6 className="text-base md:text-lg w-40 text-center">There is someone to buy you a <b className="font-bold">Chai</b></h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}
