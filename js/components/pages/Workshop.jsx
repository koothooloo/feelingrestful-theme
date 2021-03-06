import React from 'react'
import {findWhere} from 'underscore'
import {fetchWorkshop} from '../../actions'
import Text from '../modules/Text'
import Image from '../modules/Image'
import Blockquote from '../modules/Blockquote'
import Header from '../modules/Header'
import Map from '../modules/Map'
import TwitterTimeline from '../modules/TwitterTimeline'
import Intro from '../modules/Intro'
import SpeakersOverview from '../modules/SpeakersOverview'
import Workshops from '../modules/Workshops'
import TestimonialSlider from '../modules/TestimonialSlider'
import SponsorsBlock from '../modules/SponsorsBlock'
import CallToActionBlock  from '../modules/CallToActionBlock'
import OrganisedBy from '../modules/OrganisedBy'
import Tickets from '../modules/Tickets'
import SponsorsDetail from '../modules/SponsorsDetail'

module.exports = React.createClass( {

	componentDidMount: function () {
		if ( ! this.props.posts.preview ) {
			this.props.dispatch( fetchWorkshop( Number( this.props.routeParams.id ) ) )
		}
	},

	render: function () {
		var workshop = this.props.posts.preview || findWhere( this.props.posts.workshops, {id: Number( this.props.routeParams.id )} )

		if ( ! workshop ) {
			return (
				<div className="loading-wrap">
					<div className="loading"><span className="fa fa-heart"></span> Loading</div>
				</div>
			)
		}

		return (
			<div className="WorkshopPage Page SinglePage">
				<div className="Page--header">
					<span className="site-logo"></span>
					<h1>{workshop.title.rendered}</h1>
				</div>
				<div className="Page--content">
					{workshop.page_builder && workshop.page_builder.modules.map( ( Module, i ) => {
						Module.data.key = Module.type + '-' + i
						switch ( Module.type ) {
							case 'text':
								return <Text {...Module.data} />
							case 'blockquote':
								return <Blockquote {...Module.data} />
							case 'image':
								return <Image {...Module.data} />
							case 'header':
								return <Header {...Module.data} />
							case 'map':
								return <Map {...Module.data} />
							case 'twitter_timeline':
								return <TwitterTimeline {...Module.data} />
							case 'intro':
								return <Intro {...Module.data} />
							case 'speakers_overview':
								return <SpeakersOverview {...Module.data} {...this.props} />
							case 'workshops':
								return <Workshops {...Module.data} {...this.props} />
							case 'testimonial_slider':
								return <TestimonialSlider {...Module.data} {...this.props} />
							case 'sponsors_block':
								return <SponsorsBlock {...Module.data} {...this.props} />
							case 'sponsors_detail':
								return <SponsorsDetail {...Module.data} {...this.props} />
							case 'cta_block':
								return <CallToActionBlock {...Module.data} />
							case 'organised_by':
								return <OrganisedBy {...Module.data} />
							case 'tickets':
								return <Tickets {...Module.data} />
						}
						return <div></div>
					} )}

				</div>
			</div>
		)
	}
} )
