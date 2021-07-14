export interface Show {
    title: string;
    movieTitle: string;
    plot: string;
    poster: string;
    imdbId: string;
    data: OMDBResult;
    ratings: Rating[];
}

export interface Rating {
    Source: string;
    Value: string;
}

export interface OMDBResult {
    Year: string;
    Type: string;
    Genre: string;
}
