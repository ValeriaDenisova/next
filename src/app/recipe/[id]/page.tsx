'use client';
import Header from "@/shared/components/Header";
import Recipe from "@components/pages/Recipe";
import { useParams } from "next/navigation";
import '@styles/index.scss';

export default function RecipePage(){
    const params = useParams();
    if (!params) {
        return null;
    }
    const { id } = params;

    return (
        <>
        {/* <Header/> */}
        <Recipe id={id} />
        </>
        
    )
}