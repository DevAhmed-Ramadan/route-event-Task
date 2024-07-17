import loaderCoin from '../assets/loader-coin.png'
import loaderHand from '../assets/loader-hand.png'

export default function Loader() {
    return (
        <div className='bg-black inset-0 flex justify-center items-center absolute z-10 '>
            <div className="loader z-20">
                <div className="loader__image">
                    <div className="loader__coin">
                        <img src={loaderCoin} alt="" className='w-full'/>
                    </div>
                    <div className="loader__hand">
                        <img src={loaderHand} alt="" className='w-full'/>
                    </div>
                </div>
            </div>
        </div>
    )

}
