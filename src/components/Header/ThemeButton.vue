<template>
	<div id="themeButton">
		<input @change="toggleTheme" id="checkbox" type="checkbox" class="switch-checkbox" />
		<label for="checkbox" class="switch-label">
			<font-awesome-icon class="dark-icon" icon="moon" />
			<font-awesome-icon class="light-icon" icon="sun" />
			<div class="switch-toggle" :class="{ 'switch-toggle-checked': userTheme === 'dark-theme' }"></div>
		</label>
	</div>
</template>

<script>
export default {
	name: 'ThemeButton',

	data() {
		return {
			userTheme: "light-theme",
		};
	},

	created() {
		const localPreference = localStorage.getItem("user-theme");
		if (localPreference) {
			this.setTheme(localPreference);
		} else {
			const hasDarkPreference = window.matchMedia(
				"(prefers-color-scheme: dark)"
			).matches;
			this.setTheme(hasDarkPreference ? "dark-theme" : "light-theme");
		}
	},

	methods: {
		setTheme(theme) {
			localStorage.setItem("user-theme", theme);
			this.userTheme = theme;
			document.documentElement.className = theme;
		},

		toggleTheme() {
			if (this.userTheme === "light-theme") {
				this.setTheme("dark-theme");
			} else {
				this.setTheme("light-theme");
			}
		},
	},
};
</script>

<style scoped>
#themeButton {
	text-align: -webkit-right;
	user-select: none;
	position: absolute;
	right: 1%;
}

.switch-checkbox {
	display: none;
}

.switch-label {
	align-items: center;
	background: var(--text-primary-color);
	border: calc(var(--element-size) * 0.025) solid var(--accent-color);
	border-radius: var(--element-size);
	cursor: pointer;
	display: flex;
	font-size: calc(var(--element-size) * 0.3);
	height: calc(var(--element-size) * 0.35);
	position: relative;
	padding: calc(var(--element-size) * 0.1);
	transition: background 0.5s ease;
	justify-content: space-between;
	width: var(--element-size);
}

.switch-toggle {
	position: absolute;
	background-color: var(--background-primary-color);
	border-radius: 50%;
	top: calc(var(--element-size) * 0.07);
	left: calc(var(--element-size) * 0.07);
	height: calc(var(--element-size) * 0.4);
	width: calc(var(--element-size) * 0.4);
	transform: translateX(0);
	transition: transform 0.3s ease, background-color 0.5s ease;
}

.switch-toggle-checked {
	transform: translateX(calc(var(--element-size) * 0.6)) !important;
}

.dark-icon {
	color: #000;
}

.light-icon {
	color: #e0d318;
}

#checkbox:checked + .switch-label > .dark-icon {
	visibility: hidden;
}

#checkbox:not(:checked) + .switch-label > .light-icon {
	visibility: hidden;
}
</style>