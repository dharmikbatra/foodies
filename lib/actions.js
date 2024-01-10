'use server'

import { redirect } from "next/navigation"
import { saveMeal } from "./meals"
import { redirects } from "@/next.config"
import { revalidatePath } from "next/cache";

function isInvalidString(text){
    return !text ||text.trim() === '';
}

export async function shareMeal(prevState, formData){
    const meal = {
        title:formData.get('title'),
        summary:formData.get('summary'),
        instructions:formData.get('instructions'),
        image:formData.get('image'),
        creator:formData.get('name'),
        creator_email:formData.get('email')
    }

    if(isInvalidString(meal.title) ||
    isInvalidString(meal.summary) ||
    isInvalidString(meal.instructions) ||
    isInvalidString(meal.creator_email) ||
    isInvalidString(meal.creator) ||
    !meal.creator_email.includes('@') ||
    !meal.image || meal.image.size === 0){
        return {
            message:'invalid input'
        }

    }
    await saveMeal(meal)
    revalidatePath('/meals')
    redirect('/meals')
}