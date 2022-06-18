import Head from 'next/head';

export default function Header({
    title = "Software job statistics",
    imageUrl,
    preload = [],
    url = "",
    desc = ""}) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta name="author" content="niemal" />
                <meta name="application-name" content="software-jobs" />
                <meta name="description" content={'Check software jobs around the world by a skill-set and apply!'} />
                <meta name="thumbnail" content={imageUrl} />

                <link rel="icon" href="/favicon.ico" />
                <link rel="image_src" href={imageUrl} />
                
                {preload.filter((img) => img !== undefined && img !== '')
                .map((img) => 
                    <link key={uuid()} rel="preload" href={img} as="image" />
                )}

                <meta property="og:type" content={'website'} />
                <meta property="og:site_name" content="software-jobs" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={'Check software jobs around the world by a skill-set and apply!'} />
                <meta property="og:image" content={imageUrl} />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:creator" content="@niemal_dev" />
                <meta name="twitter:url" content={url} />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={desc} />
                <meta name="twitter:image" content={imageUrl} />
            </Head>
        </>
    );
}