import React from "react";
import { useMutation } from '@apollo/client';
import { addMovie } from "../queries/queries";
import { useForm } from 'react-hook-form'
import { useState } from 'react'

const AddMovie = () => {
    const { register, handleSubmit } = useForm() 
    const [movie, setMovie] = useState({})
    const [mutateFunction, { data, loading, error }] = useMutation(addMovie);

    
    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    return (
        <div className="addMovie" id="form">
            <form onSubmit={handleSubmit((data) => {
                data.image = 'https://images-na.ssl-images-amazon.com/images/I/91hFxTjgTSL._SL1500_.jpg'
                console.log(data);
                mutateFunction({variables: data})
                    .then(r => {
                        console.log(r)
                    })
            })}>
                <label>Name</label>
                <input {...register("name")} type="text" required></input>
                <label>Genre</label>
                <input {...register("genre")} type="text"></input>
                <label>Year</label>
                <input {...register("year")} type="text" placeholder="(optional)"></input>
                <button type="submit">Add Movie</button>
            </form>
        </div>
    );
}

export default AddMovie;