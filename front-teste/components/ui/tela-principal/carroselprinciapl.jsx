"use client"

import { useEffect, useState } from 'react'
import { sinopseAPI } from '../../../src/app/utils/api'
import Image from 'next/image'

export default function CarroselPrincipal() {
    const [items, setItems] = useState([])
    const [index, setIndex] = useState(0)

    const visible = 6

    useEffect(() => {
        let mounted = true
        sinopseAPI
            .popular()
            .then((res) => {
                if (!mounted) return
                setItems(Array.isArray(res.data?.data?.results) ? res.data.data.results : [])
            })
            .catch(() => {
                if (!mounted) return
                setItems([])
            })
        return () => (mounted = false)
    }, [])

    const prev = () => setIndex((i) => Math.max(0, i - visible))
    const next = () => setIndex((i) => Math.min(Math.max(0, items.length - visible), i + visible))

    const pickImage = (it) =>
        it?.local_poster || it?.poster_path || it?.imagem || it?.capa || it?.url || ''

    const pickTitle = (it) =>
        it?.title || it?.nome || it?.titulo || 'Sem título'

    if (!items.length) {
        return (
            <div className="w-full py-8 text-center text-gray-500 bg-black">
                Carregando...
            </div>
        )
    }

    const cardWidth = 160
    const gap = 4

    return (
        <section className="w-full bg-black py-6 group">
            <h2 className="text-white text-base font-semibold px-12 mb-2 tracking-wide">
                Populares na Netflix
            </h2>

            <div className="relative">
                <button
                    onClick={prev}
                    disabled={index === 0}
                    className="absolute left-0 top-0 bottom-0 z-20 w-10 bg-black/70 text-white text-3xl opacity-0 group-hover:opacity-100 transition disabled:invisible flex items-center justify-center"
                >
                    ‹
                </button>

                <div className="overflow-hidden px-10 py-4">
                    <div
                        className="flex transition-transform duration-500 ease-in-out"
                        style={{
                            gap: `${gap}px`,
                            transform: `translateX(-${index * (cardWidth + gap)}px)`,
                        }}
                    >
                        {items.map((it, i) => (
                            <div
                                key={i}
                                className="flex-shrink-0 cursor-pointer group/item relative transition-transform duration-300 ease-in-out hover:scale-110 hover:z-10"
                                style={{ width: `${cardWidth}px` }}
                            >
                                <div className="relative overflow-hidden rounded-sm ring-0 group-hover/item:ring-2 group-hover/item:ring-white transition-all duration-300">
                                    <Image
                                        src={pickImage(it) || '/placeholder.png'}
                                        alt={pickTitle(it)}
                                        width={cardWidth}
                                        height={240}
                                        className="object-cover w-full h-[90px] sm:h-[110px] md:h-[130px]"
                                        unoptimized
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/30 transition duration-300" />
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 px-1 pb-1 opacity-0 group-hover/item:opacity-100 transition duration-300">
                                    <p className="text-white text-[11px] font-semibold truncate drop-shadow">
                                        {pickTitle(it)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <button
                    onClick={next}
                    disabled={index >= items.length - visible}
                    className="absolute right-0 top-0 bottom-0 z-20 w-10 bg-black/70 text-white text-3xl opacity-0 group-hover:opacity-100 transition disabled:invisible flex items-center justify-center"
                >
                    ›
                </button>
            </div>
        </section>
    )
}