/// <reference path="./util/ServiceManager.ts" />

namespace Win98 {
    const main = async () => {
        await ServiceManager.initialize();
    };

    main().then();
}