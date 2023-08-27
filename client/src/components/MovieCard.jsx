import React from 'react';

const MovieCard = ({movie, onDelete}) => {
  const _handleDelete = () => {
    onDelete();
  };

  return (
    <div className="bg-white p-4 rounded shadow-md w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={_handleDelete}
        >
          &times;
        </button>
      </div>
      <p className="text-gray-600">Year: {movie.year}</p>
      <p className="text-gray-600">Format: {movie.format}</p>
      {!!movie?.Actors?.length && (
        <>
          <h4 className="text-md font-medium text-gray-600 mt-2">Actors:</h4>
          <ul className="list-disc list-inside mt-1">
            {movie.Actors.map((actor) => (
              <li key={actor.id}>{actor.name} {actor.surname}</li>
            ))}
          </ul>
        </>
      )}

    </div>
  );
};

export default MovieCard;
