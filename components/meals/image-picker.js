"use client"
import { useRef, useState } from 'react'
import classes from './image-picker.module.css'
import Image from 'next/image';
export default function ImagePicker({label, name}){
    const imageInput = useRef();
    const [pickedImage, setPickedImage] = useState('');

    function handlePickCLick(){
        imageInput.current.click();
    }
    function handleImageChanged(event){
        const file = event.target.files[0];
        if(!file){
            setPickedImage(null)
            return
        }
        const fileReader = new FileReader()
        fileReader.onload = () => {
            setPickedImage(fileReader.result)
        }
        fileReader.readAsDataURL(file)
    }
    return <div className={classes.picker}>
        <label htmlFor={name}>{label}</label>
        <div className={classes.controls}>
            <div className={classes.preview}>
                {!pickedImage &&<p> No image picked</p>}
                {pickedImage && <Image
                src={pickedImage}
                fill/>}
            </div>
            <input
            className={classes.input}
            type="file"
            id={name}
            accept='image/png image/jpeg'
            name={name}
            ref={imageInput}
            onChange={handleImageChanged}
            required
            />
        </div>
        <button
        className={classes.button}
        type="button"
        onClick={handlePickCLick}>
            Pick an Image
        </button>

    </div>

}