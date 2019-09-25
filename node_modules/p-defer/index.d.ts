declare namespace pDefer {
	interface DeferredPromise<ValueType> {
		/**
		Resolves the promise with a value or the result of another promise.

		@param value - The value to resolve the promise with.
		*/
		resolve(value?: ValueType | PromiseLike<ValueType>): void;

		/**
		Reject the promise with a provided reason or error.

		@param reason - The reason or error to reject the promise with.
		*/
		reject(reason?: unknown): void;

		/**
		The deferred promise.
		*/
		promise: Promise<ValueType>;
	}
}

declare const pDefer: {
	/**
	Create a deferred promise.

	@example
	```
	import pDefer = require('p-defer');

	function delay(ms) {
		const deferred = pDefer();
		setTimeout(deferred.resolve, ms, '🦄');
		return deferred.promise;
	}

	(async () => {
		console.log(await delay(100));
		//=> '🦄'
	})();
	```
	*/
	<ValueType = unknown>(): pDefer.DeferredPromise<ValueType>;

	// TODO: Remove this for the next major release, refactor the whole definition to:
	// declare function pDefer<ValueType = unknown>(): pDefer.DeferredPromise<
	// 	ValueType
	// >;
	// export = pDefer;
	default: typeof pDefer;
};

export = pDefer;
