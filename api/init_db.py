#!/usr/bin/env python3
"""
Database initialization script for byNolo API
This script creates the database tables and populates them with initial data
"""

import os
import sys
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app import create_app
from app.models import db, Project, SiteStats, HubItem, Category, SiteSetting
from datetime import datetime

def init_db():
    """Initialize the database with tables and sample data"""
    app = create_app()
    
    with app.app_context():
        # Create all tables
        db.create_all()
        print("✅ Database tables created successfully")
        
        # Check if projects already exist
        if Project.query.count() == 0:
            # Add sample projects based on your current static data
            projects_data = [
                {
                    'title': 'byNolo Portfolio',
                    'slug': 'bynolo-portfolio',
                    'description': 'A dark-first portfolio and project hub for byNolo work, experiments, and collaboration.',
                    'tech_stack': ['React', 'Vite', 'Tailwind', 'Framer Motion'],
                    'github_url': 'https://github.com/byNolo/bynolo-site',
                    'live_url': 'https://bynolo.com',
                    'featured': True,
                    'status': 'Active',
                    'order_index': 4,
                    'kicker': 'Studio home base',
                    'impact': 'The public front door for work, services, experiments, and contact.',
                    'showcase_image_url': '/showcase/portfolio.svg'
                },
                {
                    'title': 'KeyN Authentication',
                    'slug': 'keyn-authentication',
                    'description': 'A custom authentication service for shared login, sessions, and identity across byNolo projects.',
                    'tech_stack': ['Auth', 'JWT', 'OAuth2', 'Flask', 'Security'],
                    'github_url': 'https://github.com/byNolo/keyn',
                    'live_url': 'https://keyn.bynolo.com',
                    'featured': True,
                    'status': 'Active',
                    'order_index': 2,
                    'kicker': 'Shared identity layer',
                    'impact': 'A self-hosted auth backbone for the byNolo ecosystem.',
                    'showcase_image_url': '/showcase/keyn.svg'
                },
                {
                    'title': 'SideQuest',
                    'slug': 'sidequest',
                    'description': 'A gamified local discovery platform for turning daily routines into small, trackable adventures.',
                    'tech_stack': ['Flask', 'Gamification', 'Geo', 'Automation'],
                    'github_url': '',
                    'live_url': 'https://sidequest.bynolo.com',
                    'featured': True,
                    'status': 'Planning',
                    'order_index': 3,
                    'kicker': 'Location-aware game layer',
                    'impact': 'A planning-stage quest engine for daily adventure and discovery.',
                    'showcase_image_url': '/showcase/sidequest.svg'
                },
                {
                    'title': 'Vinyl Vote',
                    'slug': 'vinyl-vote',
                    'description': 'A weekly album voting platform for friend groups with listening rooms, rankings, and simple admin tools.',
                    'tech_stack': ['Flask', 'React', 'Charts', 'Auth'],
                    'github_url': 'https://github.com/byNolo/vinyl-vote',
                    'live_url': 'https://vinylvote.bynolo.com',
                    'featured': True,
                    'status': 'Active',
                    'order_index': 1,
                    'kicker': 'Social music platform',
                    'impact': 'Weekly album rooms, voting, charts, and a shared reason to listen.',
                    'showcase_image_url': '/showcase/vinyl-vote.svg'
                }
            ]
            
            for project_data in projects_data:
                project = Project(
                    title=project_data['title'],
                    description=project_data['description'],
                    github_url=project_data['github_url'],
                    live_url=project_data['live_url'],
                    featured=project_data['featured'],
                    status=project_data['status'],
                    order_index=project_data['order_index'],
                    slug=project_data['slug'],
                    kicker=project_data['kicker'],
                    impact=project_data['impact'],
                    showcase_image_url=project_data['showcase_image_url'],
                    visibility='public',
                    accent='green'
                )
                project.set_tech_stack(project_data['tech_stack'])
                db.session.add(project)
            
            db.session.commit()
            print(f"✅ Added {len(projects_data)} projects to database")
        else:
            print("📋 Projects already exist in database")
        
        # Check if stats already exist
        if SiteStats.query.count() == 0:
            stats_data = [
                {
                    'key': 'years_experience',
                    'value': '3',
                    'description': 'Years of professional development experience'
                },
                {
                    'key': 'technologies',
                    'value': 'Python,JavaScript,React,Flask,Docker,TypeScript',
                    'description': 'Main technologies and tools'
                }
            ]
            
            for stat_data in stats_data:
                stat = SiteStats(**stat_data)
                db.session.add(stat)
            
            db.session.commit()
            print(f"✅ Added {len(stats_data)} statistics to database")
        else:
            print("📊 Statistics already exist in database")
        
        # Check if categories already exist
        if Category.query.count() == 0:
            categories_data = [
                {'slug': 'service', 'name': 'Services', 'description': 'Infrastructure, APIs, and shared systems', 'order_index': 1},
                {'slug': 'app', 'name': 'Apps', 'description': 'Full product experiences and tools', 'order_index': 2},
                {'slug': 'site', 'name': 'Sites', 'description': 'Websites, portfolios, and public surfaces', 'order_index': 3},
                {'slug': 'tool', 'name': 'Tools', 'description': 'Utilities, automations, and experiments', 'order_index': 4},
            ]
            for category_data in categories_data:
                db.session.add(Category(**category_data, color='from-green-400 to-green-600', featured=True))
            db.session.commit()
            print(f"✅ Added {len(categories_data)} categories to database")
        else:
            print("🏷️ Categories already exist in database")

        # Check if hub items already exist
        if HubItem.query.count() == 0:
            hub_items_data = [
                {
                    'title': 'Vinyl Vote',
                    'slug': 'vinyl-vote',
                    'description': 'Weekly album voting platform for listening rooms and shared music rituals.',
                    'icon': 'Music',
                    'icon_type': 'lucide',
                    'icon_label': 'Music icon',
                    'link': 'https://vinylvote.bynolo.com',
                    'status': 'Live',
                    'categories': ['app', 'service'],
                    'color': 'from-emerald-400 to-green-500',
                    'order_index': 1,
                    'featured': True,
                    'kicker': 'Social music platform',
                    'impact': 'Weekly album rooms, voting, charts, and a shared reason to listen.',
                    'showcase_image_url': '/showcase/vinyl-vote.svg'
                },
                {
                    'title': 'KeyN Authentication',
                    'slug': 'keyn-authentication',
                    'description': 'Secure authentication system powering byNolo logins and shared sessions.',
                    'icon': 'ShieldCheck',
                    'icon_type': 'lucide',
                    'icon_label': 'Shield icon',
                    'link': 'https://keyn.bynolo.com',
                    'status': 'Live',
                    'categories': ['service'],
                    'color': 'from-green-400 to-teal-400',
                    'order_index': 2,
                    'featured': True,
                    'kicker': 'Shared identity layer',
                    'impact': 'A self-hosted auth backbone for the byNolo ecosystem.',
                    'showcase_image_url': '/showcase/keyn.svg'
                },
                {
                    'title': 'Portfolio',
                    'slug': 'portfolio',
                    'description': 'The central studio site for projects, services, and contact.',
                    'icon': 'PanelsTopLeft',
                    'icon_type': 'lucide',
                    'icon_label': 'Interface icon',
                    'link': '/',
                    'status': 'Active',
                    'categories': ['site'],
                    'color': 'from-lime-300 to-green-500',
                    'order_index': 3,
                    'featured': True,
                    'kicker': 'Studio home base',
                    'impact': 'The public front door for work, services, experiments, and contact.',
                    'showcase_image_url': '/showcase/portfolio.svg'
                },
                {
                    'title': 'SideQuest',
                    'slug': 'sidequest',
                    'description': 'Gamified daily adventures and local discovery platform',
                    'icon': 'Map',
                    'icon_type': 'lucide',
                    'icon_label': 'Map icon',
                    'link': 'https://sidequest.bynolo.com',
                    'status': 'Planning',
                    'categories': ['app', 'tool'],
                    'color': 'from-green-300 to-emerald-500',
                    'order_index': 4,
                    'featured': True,
                    'kicker': 'Location-aware game layer',
                    'impact': 'A planning-stage quest engine for daily adventure and discovery.',
                    'showcase_image_url': '/showcase/sidequest.svg'
                }
            ]
            
            for item_data in hub_items_data:
                item = HubItem(
                    title=item_data['title'],
                    description=item_data['description'],
                    icon=item_data['icon'],
                    icon_type=item_data['icon_type'],
                    icon_label=item_data['icon_label'],
                    link=item_data['link'],
                    status=item_data['status'],
                    color=item_data['color'],
                    order_index=item_data['order_index'],
                    featured=item_data['featured'],
                    slug=item_data['slug'],
                    kicker=item_data['kicker'],
                    impact=item_data['impact'],
                    showcase_image_url=item_data['showcase_image_url'],
                    visibility='public',
                    accent='green'
                )
                item.set_categories(item_data['categories'])
                db.session.add(item)
            
            db.session.commit()
            print(f"✅ Added {len(hub_items_data)} hub items to database")
        else:
            print("🎯 Hub items already exist in database")

        if SiteSetting.query.count() == 0:
            settings_data = [
                {'key': 'brand_name', 'value': 'byNolo', 'value_type': 'text', 'description': 'Public brand name'},
                {'key': 'admin_notes', 'value': 'Use /admin to manage portfolio content and screenshots.', 'value_type': 'text', 'description': 'Internal admin note'},
            ]
            for setting_data in settings_data:
                db.session.add(SiteSetting(**setting_data))
            db.session.commit()
            print(f"✅ Added {len(settings_data)} site settings")
        else:
            print("⚙️ Site settings already exist in database")
        
        print("\n🎉 Database initialization completed successfully!")
        print(f"📍 Database location: {app.config['SQLALCHEMY_DATABASE_URI']}")

if __name__ == '__main__':
    init_db()
