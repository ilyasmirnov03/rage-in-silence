<script>
	import { isOpen } from "../store.js";

	function close() {
		$isOpen = false;
		navigator.vibrate(0);
	}
</script>

<div class="popup" class:hidden={!$isOpen}>
	<div class="popup__container">
		<slot class="popup__text" />
		<button class="popup__closeButton" on:click={close}>OK</button>
	</div>
</div>

<style>
	.popup {
		position: fixed;
		z-index: 9999;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: rgba(0, 0, 0, 0.4);
	}
	.popup__container {
		text-align: center;
		padding:.5rem 2rem;
		background-color: #1a1a1a;
		margin: 15% auto;
	}
	.popup__closeButton {
		color: #aaa;
		font-size: 1rem;
		font-weight: bold;
		cursor: pointer;
	}
	.popup__closeButton:hover,
	.popup__closeButton:focus {
		color: black;
		text-decoration: none;
		cursor: pointer;
	}
	.hidden {
		display: none;
	}
</style>
