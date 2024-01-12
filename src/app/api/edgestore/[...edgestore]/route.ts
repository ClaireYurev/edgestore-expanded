import { initEdgeStore } from "@edgestore/server"
import { createEdgeStoreNextHandler } from "@edgestore/server/adapters/next/app"

const es = initEdgeStore.create();

const edgeStoreRouter = es.router({
    requestedEstimates: es
        .fileBucket({
            maxSize: 16130 * 12098 * 2048, // 2048MB Server-side limit for the bucket
            accept: ['image/*', 'video/*'], // wildcard, but this also works: ['image/jpeg', 'image/png']
        }),
})

const handler = createEdgeStoreNextHandler({
    router: edgeStoreRouter,
})

// export { handler as GET, handler as POST, handler as PUT, handler as DELETE }
export { handler as GET, handler as POST }

export type EdgeStoreRouter = typeof edgeStoreRouter;