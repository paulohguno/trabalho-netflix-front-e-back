'use client'

import { useParams } from 'next/navigation'
import HeaderPrincipal from '@/components/ui/tela-principal/header-principal'
import CarroselPrincipal from '@/components/ui/tela-principal/carroselprinciapl'
import Cards from '@/components/ui/tela-principal/cards'


export default function Principal() {
    const parametros = useParams()


    return (
        <main >


            <HeaderPrincipal />
            <Cards/>
            <CarroselPrincipal/>
            <CarroselPrincipal/>
            <CarroselPrincipal/>

            <section>
                
            </section>


            

        </main>
    )
}