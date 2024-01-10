import MealsGrid from "@/components/meals/meals-grid";
import Link from "next/link";
import classes from "./page.module.css"
import { getMeals } from "@/lib/meals";
import { Suspense } from "react";
import MealsLoadingPage from "./loading-out";

async function Meals(){
    const meals = await getMeals()
    return (
        <MealsGrid meals={meals}/>
    )
}

export default function Mealspage(){

    return <>
    <header className={classes.header}>
        <h1>Delicious meals, created {' '}
        <span className={classes.highlight}>by you</span>
        </h1>
        <p>Choose your fav recipe and cook it yourself. it is easy and fun</p>
        <p className={classes.cta}>
            <Link href="/meals/share">Share your fav recipe</Link>
        </p>
    </header>
    <main>
        <Suspense fallback={<MealsLoadingPage/>}>
        <Meals />
        </Suspense>
    </main>
    </>
}