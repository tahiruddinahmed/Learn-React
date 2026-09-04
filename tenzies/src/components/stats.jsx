function Stats({ rollCount, timer }) {

    const formatTime = (timer) => {
        const hours = Math.floor(timer / 3600);
        const minutes = Math.floor((timer % 3600) / 60);
        const seconds = timer % 60;

        if (hours > 0) {
            return `${hours}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
        }

        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    }

    return (
        <div className="flex justify-center gap-12 mt-8 py-5 border-y border-white/10">
          <div className="text-center min-w-30">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Rolls
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">{rollCount}</h3>
          </div>

          <div className="w-px bg-white/10"></div>

          <div className="text-center min-w-30">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Best
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">08</h3>
          </div>

          <div className="w-px bg-white/10"></div>

          <div className="text-center min-w-30">
            <p className="text-xs uppercase tracking-widest text-slate-500">
              Time
            </p>
            <h3 className="mt-1 text-2xl font-bold text-white">{formatTime(timer)}</h3>
          </div>
        </div>
    )
}

export default Stats