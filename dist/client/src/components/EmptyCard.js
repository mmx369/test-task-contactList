"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function EmptyCard() {
    return (<div className='flex flex-col w-full text-xs border-2 border-solid shadow-inner rounded-md p-1 my-2 bg-slate-50 hover:border-violet-300 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-105 duration-300'>
      <div className='grid grid-cols-6 font-semibold'>
        <div>Not Found!</div>
      </div>
    </div>);
}
exports.default = EmptyCard;
