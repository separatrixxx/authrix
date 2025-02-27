import type { NextConfig } from "next";


const withNextIntl = require('next-intl/plugin')();

const nextConfig: NextConfig = {
	webpack(config) {
		config.module.rules.push({
			test: /\.svg$/,
			use: [
				{
					loader: '@svgr/webpack',
					options: {
						prettier: false,
						svgo: true,
						svgoConfig: {
							plugins: [
								{
									name: 'preset-default',
									params: {
										override: {
											removeViewBox: false,
										},
									},
								},
							],
						},
						titleProp: true,
						ref: true,
					},
				},
			],
		});

		return config;
	},
};

export default withNextIntl(nextConfig);
