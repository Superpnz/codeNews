"use client";

import { useState } from "react";

type PostCoverProps = {
    className: string;
    src: string;
    alt: string;
};

const PostCover = ({ className, src, alt }: PostCoverProps) => {
    const [failed, setFailed] = useState(false);

    if (failed) {
        return (
            <div className={`post-cover post-cover--placeholder ${className}`} role="img" aria-label="Обложка недоступна">
                Обложка недоступна
            </div>
        );
    }
    return <img className={`post-cover ${className}`} src={src} alt={alt} onError={() => setFailed(true)} />; 
};

export default PostCover;
