import Image from "next/image";

export default function Home() {
  return <>
    <div className=' flex flex-col justify-center items-center pt-15 min-h-screen select-none'>
      <div className=" flex justify-center items-center text-5xl  baloo-semibold ">

        <span className="pt-8 pl-8">Get me A chai</span><span> <img src="tea.gif" style={{ width: 120 }} alt="" /></span>
      </div>
      <div className="text-xl  baloo-regular flex flex-col justify-center items-center pb-20">
        <h2 >
          A crowdFunding platform for Needy people
        </h2>
        <h2>
          You can buy a chai to them
        </h2>
      </div>
      <div className="border-b border-[rgb(62,62,71)] w-[90vw]"></div>
      <div className="flex flex-col justify-center items-center space-y-10 py-20">
        <div >
          <h4 className=" text-3xl baloo-semibold">Concept of our Chai</h4>
        </div>
        <div className="flex justify-around space-x-30">
          <div className="baloo-light flex flex-col justify-center items-center space-y-3">
            <img src="man.gif" style={{ width: 80 }} className="p-2 bg-[rgb(46,46,46)] rounded-full overflow-clip border-[1px] border-gray-300 " alt="" />
            <div className="flex flex-col justify-center items-center">

              <h5 className="text-2xl"><b className="font-bold">Chai</b></h5>
              <h6 className="text-lg w-40 text-center">You can buy <b className="font-bold">Chai</b> to needy</h6>
            </div>
          </div>
          <div className="baloo-light flex flex-col justify-center items-center space-y-3">
            <img src="coin.gif" style={{ width: 80 }} className="p-2 bg-[rgb(46,46,46)] rounded-full overflow-clip border-[1px] border-gray-300 " alt="" />
            <div className="flex flex-col justify-center items-center">

              <h5 className="text-2xl"><b className="font-bold"><b className="font-bold">Chai</b></b></h5>
              <h6 className="text-lg w-40 text-center">Some need this <b className="font-bold">Chai</b> more than you</h6>
            </div>
          </div>
          <div className="baloo-light flex flex-col justify-center items-center space-y-3">
            <img src="avatar.gif" style={{ width: 80 }} className="p-2 bg-[rgb(46,46,46)] rounded-full overflow-clip border-[1px] border-gray-300 " alt="" />
            <div className="flex flex-col justify-center items-center">

              <h5 className="text-2xl"><b className="font-bold"><b className="font-bold">Chai</b></b></h5>
              <h6 className="text-lg w-40 text-center">There is someone to buy you a <b className="font-bold">Chai</b></h6>
            </div>
          </div>
        </ div>
      </div>
    </div>
  </>

}
