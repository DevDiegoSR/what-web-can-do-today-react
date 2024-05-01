export function PeerAndGroup() {
  // change element style based on the state of another element
  return (
    <section className="flex-1 p-6 grid grid-cols-4 auto-rows-min gap-4">
      <div className="group h-40 w-40 bg-neutral-300 grid place-items-center hover:cursor-pointer">
        <p className="text-center text-black text-sm">
          change children style based on parent state (group)
        </p>
        <div className="h-10 w-10 bg-red-500 group-hover:bg-green-500"></div>
      </div>
      <div className="flex gap-2">
        <div className="peer h-40 w-40 bg-neutral-300 grid place-items-center hover:cursor-pointer">
          <p className="text-center text-black text-sm">
            changing the style of siblings based on the state of a sibling
            (peer):
          </p>
        </div>
        <div className="h-10 w-10 bg-red-500 peer-hover:bg-green-500"></div>
      </div>
      <div className="flex gap-2">
        <div className="group peer h-40 w-40 bg-neutral-300 grid place-items-center hover:cursor-pointer">
          <div className="h-10 w-10 bg-red-500 group-hover:bg-green-500"></div>
        </div>
        <div className="h-10 w-10 bg-red-500 peer-hover:bg-yellow-500"></div>
      </div>
      <div className="flex gap-2">
        <div className="group/name1 group/name2 peer/name3 peer/name4 h-40 w-40 bg-neutral-300 grid place-items-center hover:cursor-pointer">
          <div className="h-10 w-10 bg-red-500 group-hover/name1:bg-green-500"></div>
          <div className="h-10 w-10 bg-red-500 group-hover/name2:bg-yellow-500"></div>
        </div>
        <div className="h-10 w-10 bg-red-500 peer-hover/name3:bg-blue-500"></div>
        <div className="h-10 w-10 bg-red-500 peer-hover/name4:bg-orange-500"></div>
      </div>
    </section>
  );
}
